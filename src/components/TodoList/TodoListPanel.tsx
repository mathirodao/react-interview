import React from "react";
import { TodoList } from "../../types/todoList.types";
import { TodoListCard } from "./TodoListCard";
import { Button } from "../common/Button";

interface TodoListsPanelProps {
  todoLists: TodoList[];
  selectedListId: number | null;
  onSelectList: (id: number) => void;
  onEditList: (list: TodoList) => void;
  onDeleteList: (id: number) => void;
  onCreateList: () => void;
}

export const TodoListsPanel: React.FC<TodoListsPanelProps> = ({
  todoLists,
  selectedListId,
  onSelectList,
  onEditList,
  onDeleteList,
  onCreateList,
}) => {
  if (todoLists.length === 0) {
    return (
      <div className="lg:col-span-1">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl mb-6">
            <svg
              className="w-8 h-8 text-primary-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            There are no lists yet
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Create your first list to organize your tasks
          </p>
          <Button onClick={onCreateList} className="w-full">
            Create first list
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              📋 Your lists
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">
                {todoLists.length}
              </span>
            </h3>
            <Button size="sm" onClick={onCreateList}>
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
                New list
              </div>
            </Button>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {todoLists.map((list, index) => {
              const listTotalItems = list.items.length;
              const listCompletedItems = list.items.filter(
                (item) => item.completed
              ).length;
              const listProgress =
                listTotalItems > 0
                  ? Math.round((listCompletedItems / listTotalItems) * 100)
                  : 0;

              return (
                <TodoListCard
                  key={list.id}
                  todoList={list}
                  onSelect={onSelectList}
                  onEdit={onEditList}
                  onDelete={onDeleteList}
                  isSelected={selectedListId === list.id}
                  index={index}
                  progress={listProgress}
                  completedCount={listCompletedItems}
                  totalCount={listTotalItems}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
