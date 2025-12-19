import React from "react";
import { Button } from "../common/Button";

interface TodoListHeaderProps {
  onCreateNew: () => void;
  listCount: number;
}

export const TodoListHeader: React.FC<TodoListHeaderProps> = () => {
  return (
    <header className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          TodoList
        </h1>
      </div>
    </header>
  );
};
