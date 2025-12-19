import React, { useState, useEffect } from 'react';
import { CreateTodoListDto, UpdateTodoListDto, TodoList } from '../../types/todoList.types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface TodoListFormProps {
  onSubmit: (data: CreateTodoListDto | UpdateTodoListDto) => Promise<void>;
  onCancel: () => void;
  initialData?: TodoList;
  isLoading?: boolean;
}

export const TodoListForm: React.FC<TodoListFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);

  const validate = () => {
    if (!name.trim()) {
      setError('The name is required');
      return false;
    }
    if (name.trim().length < 2) {
      setError('The name must be at least 2 characters');
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
      await onSubmit({ name: name.trim() });

    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="List name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError('');
        }}
        placeholder="Ex: Supermarket shopping"
        error={error}
        disabled={isLoading || isSubmitting}
        autoFocus
      />

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
