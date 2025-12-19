import { TodoItem } from "./todoItem.types";

export interface TodoList {
  id: number;
  name: string;
  items: TodoItem[];
}

export interface CreateTodoListDto {
  name: string;
}

export interface UpdateTodoListDto {
  name: string;
}