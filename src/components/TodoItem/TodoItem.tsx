import React from 'react';
import { TodoItem as TodoItemType } from '../../types/todoItem.types';

interface TodoItemProps {
  item: TodoItemType;
  onToggle: (id: number, completed: boolean) => void;
  onEdit: (item: TodoItemType) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`group bg-white rounded-lg border transition-all duration-200 hover:shadow-md ${
        item.completed ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
      }`}
    >
      <div className="p-4 flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(item.id, item.completed)}
          className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 transition-all duration-200 ${
            item.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-primary-400'
          }`}
        >
          {item.completed && (
            <svg
              className="w-full h-full text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4
            className={`font-medium transition-colors ${
              item.completed
                ? 'text-gray-400 line-through'
                : 'text-gray-900'
            }`}
          >
            {item.title}
          </h4>
          
          {/* description */}
          {item.description && (
            <p
              className={`mt-1 text-sm transition-colors ${
                item.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {item.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
            title="Editar"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Eliminar"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};