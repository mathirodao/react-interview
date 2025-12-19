import { useState, useEffect, useCallback } from 'react';
import { TodoItem, CreateTodoItemDto, UpdateTodoItemDto } from '../types/todoItem.types';

const API_BASE_URL = 'http://localhost:8000/api';

export const useTodoItems = (todoListId: number | null) => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completingAll, setCompletingAll] = useState(false);

  const fetchTodoItems = useCallback(async () => {
    if (!todoListId) {
      setTodoItems([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/todolists/${todoListId}/items`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setTodoItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading tasks');
      setTodoItems([]);
    } finally {
      setLoading(false);
    }
  }, [todoListId]);

  const pollJobStatus = async (jobId: string): Promise<void> => {
    const maxAttempts = 60;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
        
        if (!response.ok) {
          throw new Error('Error checking job status');
        }

        const jobData = await response.json();
        
        if (jobData.status === 'finished') {
          return;
        }
        
        if (jobData.status === 'failed') {
          throw new Error(jobData.error || 'The job failed');
        }

        await new Promise(resolve => setTimeout(resolve, 500));
        attempts++;
      } catch (err) {
        console.error('Polling Error :', err);
        throw err;
      }
    }

    throw new Error('Timeout: The job took too long to complete');
  };

  const createTodoItem = async (data: CreateTodoItemDto): Promise<TodoItem> => {
    if (!todoListId) throw new Error('No list selected');

    try {
      const response = await fetch(`${API_BASE_URL}/todolists/${todoListId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to create task';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const newItem = await response.json();
      setTodoItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error creating task';
      setError(errorMessage);
      throw err;
    }
  };

  const updateTodoItem = async (id: number, data: UpdateTodoItemDto): Promise<TodoItem> => {
    if (!todoListId) throw new Error('No list selected');

    try {
      const response = await fetch(`${API_BASE_URL}/todolists/${todoListId}/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to update task';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const updatedItem = await response.json();
      setTodoItems(prev => prev.map(item => 
        item.id === id ? updatedItem : item
      ));
      return updatedItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating task';
      setError(errorMessage);
      throw err;
    }
  };

  const toggleTodoItem = async (id: number): Promise<TodoItem> => {
    if (!todoListId) throw new Error('No list selected');

    try {
      const response = await fetch(
        `${API_BASE_URL}/todolists/${todoListId}/items/${id}/toggle`, 
        { method: 'PATCH' }
      );

      if (!response.ok) {
        let errorMessage = 'Failed to update task';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const toggledItem = await response.json();
      setTodoItems(prev => prev.map(item => 
        item.id === id ? toggledItem : item
      ));
      return toggledItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error changing status';
      setError(errorMessage);
      throw err;
    }
  };

  const completeAllTodoItems = async (): Promise<void> => {
    if (!todoListId) throw new Error('No list selected');

    const previousItems = todoItems;
    
    try {
      setCompletingAll(true);
      
      const updatedItems = todoItems.map(item => ({ ...item, completed: true }));
      setTodoItems(updatedItems);

      const response = await fetch(
        `${API_BASE_URL}/todolists/${todoListId}/items/complete-all`,
        { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        setTodoItems(previousItems);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      await pollJobStatus(result.job_id);
      await fetchTodoItems();
      
    } catch (err) {
      setTodoItems(previousItems);
      const errorMessage = err instanceof Error ? err.message : 'Error completing all tasks';
      setError(errorMessage);
      throw err;
    } finally {
      setCompletingAll(false);
    }
  };

  const deleteTodoItem = async (id: number): Promise<void> => {
    if (!todoListId) throw new Error('No list selected');

    try {
      const response = await fetch(
        `${API_BASE_URL}/todolists/${todoListId}/items/${id}`, 
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setTodoItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting task';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchTodoItems();
  }, [fetchTodoItems]);

  return {
    todoItems,
    loading,
    error,
    completingAll,
    createTodoItem,
    updateTodoItem,
    toggleTodoItem,
    completeAllTodoItems,
    deleteTodoItem,
    refetch: fetchTodoItems,
  };
};