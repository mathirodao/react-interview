import React from 'react';
import { TodoList } from '../../types/todoList.types';
import { Button } from '../common/Button';

interface TodoListCardProps {
  todoList: TodoList;
  onSelect: (id: number) => void;
  onEdit: (list: TodoList) => void;
  onDelete: (id: number) => void;
  isSelected: boolean;
  index: number;
  progress: number;
  completedCount: number;
  totalCount: number;
}

export const TodoListCard: React.FC<TodoListCardProps> = ({
  todoList,
  onSelect,
  onEdit,
  onDelete,
  isSelected,
  index,
  progress,
  completedCount,
  totalCount,
}) => {
  const handleClick = () => {
    onSelect(todoList.id);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(todoList);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(todoList.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group p-4 rounded-xl border cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'bg-primary-50 border-primary-300 shadow-sm' 
          : 'bg-gray-50/50 border-gray-200 hover:border-primary-200 hover:bg-gray-50 hover:shadow-sm'
        }
        hover:-translate-y-0.5
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-primary-500' : 'bg-gray-400'}`}></div>
            <h4 className={`font-medium ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
              {todoList.name}
            </h4>
          </div>
          
          {/* List progress bar*/}
          {totalCount > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{completedCount}/{totalCount} completed</span>
                <span className={progress === 100 ? 'text-green-600 font-medium' : 'text-primary-600 font-medium'}>
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-500 ${progress === 100 ? 'bg-green-500' : 'bg-primary-500'}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Tag - tasks completed */}
          {progress === 100 && totalCount > 0 && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
              <svg className="w-3 h-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>All completed</span>
            </div>
          )}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEditClick}
            title="Edit list"
            className="text-gray-400 hover:text-primary-600"
          >
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteClick}
            title="Eliminar lista"
            className="text-gray-400 hover:text-red-600"
          >
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};