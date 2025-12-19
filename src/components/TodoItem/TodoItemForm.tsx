import React, { useState, useEffect } from 'react';
import { CreateTodoItemDto, UpdateTodoItemDto, TodoItem } from '../../types/todoItem.types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface TodoItemFormProps {
  onSubmit: (data: CreateTodoItemDto | UpdateTodoItemDto) => Promise<void>;
  onCancel: () => void;
  initialData?: TodoItem;
  isLoading?: boolean;
}

export const TodoItemForm: React.FC<TodoItemFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const validate = () => {
    if (!title.trim()) {
      setError('El título es requerido');
      return false;
    }
    if (title.trim().length < 2) {
      setError('El título debe tener al menos 2 caracteres');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      setError('');
      
      const data: CreateTodoItemDto | UpdateTodoItemDto = {
        title: title.trim(),
        description: description.trim() || undefined,
      };
      
      await onSubmit(data);
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError('');
        }}
        placeholder="Ex: Buy milk"
        error={error}
        disabled={isLoading || isSubmitting}
        autoFocus
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this task..."
          disabled={isLoading || isSubmitting}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
        />
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading || isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || isSubmitting}>
          {isSubmitting
            ? (initialData ? 'Updating...' : 'Creating...') 
            : (initialData ? 'Update' : 'Create')
          }
        </Button>
      </div>
    </form>
  );
};