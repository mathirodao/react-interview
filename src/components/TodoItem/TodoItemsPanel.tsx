import React from 'react';
import { TodoList } from '../../types/todoList.types';
import { TodoItem } from '../../types/todoItem.types';
import { TodoItemList } from './TodoItemList';
import { Button } from '../common/Button';
import { StatsOverview } from '../common/StatsOverview';

interface TodoItemsPanelProps {
  selectedList: TodoList | undefined;
  todoItems: TodoItem[];
  loading: boolean;
  error: string | null;
  progress: number;
  completedItems: number;
  totalItems: number;
  completingAll: boolean; 
  onToggleItem: (id: number) => void;
  onEditItem: (item: TodoItem) => void;
  onDeleteItem: (id: number) => void;
  onCreateItem: () => void;
  onCompleteAll: () => void;
}

export const TodoItemsPanel: React.FC<TodoItemsPanelProps> = ({
  selectedList,
  todoItems,
  loading,
  error,
  progress,
  completedItems,
  totalItems,
  completingAll, 
  onToggleItem,
  onEditItem,
  onDeleteItem,
  onCreateItem,
  onCompleteAll,
}) => {
  if (!selectedList) {
    return (
      <div className="lg:col-span-2">
        <div className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-primary-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Select a list
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Choose a list on the left to view and manage your tasks
          </p>
          <div className="inline-flex items-center gap-2 text-primary-600 font-medium">
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 5l7 7-7 7" />
            </svg>
            Select a list to get started
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {selectedList.name}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {totalItems} {totalItems === 1 ? 'tarea' : 'tareas'}
                </span>
                <span className="text-sm text-gray-600">
                  • {completedItems} completed
                </span>
              </div>
            </div>
            <Button
              onClick={onCreateItem}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 4v16m8-8H4" />
              </svg>
              New task
            </Button>
          </div>
          
          {/* Stats */}
          <StatsOverview
            completed={completedItems}
            total={totalItems}
            completionRate={progress}
            onCompleteAll={onCompleteAll}
            completingAll={completingAll} 
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="m-6">
            <div className="p-4 bg-red-50/50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* List of items */}
        <div className="p-6">
          <TodoItemList
            items={todoItems}
            loading={loading}
            completingAll={completingAll} 
            onToggle={onToggleItem}
            onEdit={onEditItem}
            onDelete={onDeleteItem}
            onCompleteAll={onCompleteAll}
            onAddNew={onCreateItem}
          />
        </div>
      </div>
    </div>
  );
};