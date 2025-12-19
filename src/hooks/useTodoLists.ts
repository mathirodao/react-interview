import { useState, useEffect, useCallback } from 'react';
import { TodoList, CreateTodoListDto, UpdateTodoListDto } from '../types/todoList.types';

const API_BASE_URL = 'http://localhost:8000/api';

export const useTodoLists = () => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodoLists = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/todolists`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setTodoLists(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading lists');
      setTodoLists([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTodoList = async (data: CreateTodoListDto): Promise<TodoList> => {
    try {
      const response = await fetch(`${API_BASE_URL}/todolists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Intentar extraer el mensaje de error del backend
        let errorMessage = 'Failed to create list';
        try {
          const errorData = await response.json();
          // El backend devuelve { "detail": "mensaje" }
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          // Si no se puede parsear, usar status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error; // Ya tiene el mensaje del backend
      }
      throw new Error('Error desconocido al crear la lista');
    }
  };

  const updateTodoList = async (id: number, data: UpdateTodoListDto): Promise<TodoList> => {
    try {
      const response = await fetch(`${API_BASE_URL}/todolists/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Intentar extraer el mensaje de error del backend
        let errorMessage = 'Failed to update list';
        try {
          const errorData = await response.json();
          // El backend devuelve { "detail": "mensaje" }
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          // Si no se puede parsear, usar status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const updatedList = await response.json();
      setTodoLists(prev => prev.map(list => 
        list.id === id ? updatedList : list
      ));
      return updatedList;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating list';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteTodoList = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/todolists/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setTodoLists(prev => prev.filter(list => list.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting list';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchTodoLists();
  }, [fetchTodoLists]);

  return {
    todoLists,
    loading,
    error,
    createTodoList,
    updateTodoList,
    deleteTodoList,
    refetch: fetchTodoLists,
  };
};
