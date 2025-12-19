import React from "react";
import { TodoItem as TodoItemType } from "../../types/todoItem.types";
import { TodoItem } from "./TodoItem";
import { Button } from "../common/Button";
import { LoadingSpinner } from "../common/LoadingSpinner";

interface TodoItemListProps {
  items: TodoItemType[];
  loading: boolean;
  completingAll: boolean;
  onToggle: (id: number, completed: boolean) => void;
  onEdit: (item: TodoItemType) => void;
  onDelete: (id: number) => void;
  onCompleteAll: () => void;
  onAddNew: () => void;
}

export const TodoItemList: React.FC<TodoItemListProps> = ({
  items,
  loading,
  completingAll,
  onToggle,
  onEdit,
  onDelete,
  onCompleteAll,
  onAddNew,
}) => {
  const completedCount = items.filter((item) => item.completed).length;
  const totalCount = items.length;
  const hasIncompleteItems = items.some((item) => !item.completed);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Cargando tareas..." />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Tareas</h2>
          {totalCount > 0 && (
            <span className="text-sm text-gray-600">
              {completedCount} de {totalCount} completed
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {hasIncompleteItems && totalCount > 1 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onCompleteAll}
              disabled={completingAll}
            >
              {completingAll ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Completing tasks...</span>
                </>
              ) : (
                "Complete All Tasks"
              )}
            </Button>
          )}
          <Button size="sm" onClick={onAddNew}>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4" />
              </svg>
              New Task
            </div>
          </Button>
        </div>
      </div>

      {/* List of items */}
      {totalCount === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            There are no tasks yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Start by adding your first task
          </p>
          <div className="mt-6">
            <Button onClick={onAddNew}>Create first task</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {items.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
