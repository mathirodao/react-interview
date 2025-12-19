import { api } from './api';
import { TodoItem, CreateTodoItemDto, UpdateTodoItemDto } from '../types/todoItem.types';

export const getTodoItemsByListId = async (todoListId: number): Promise<TodoItem[]> => {
  return api.get<TodoItem[]>(`/api/todolists/${todoListId}/items`);
};

export const getTodoItemById = async (
  todoListId: number,
  itemId: number
): Promise<TodoItem> => {
  return api.get<TodoItem>(`/api/todolists/${todoListId}/items/${itemId}`);
};

export const createTodoItem = async (
  todoListId: number,
  data: CreateTodoItemDto
): Promise<TodoItem> => {
  return api.post<TodoItem>(`/api/todolists/${todoListId}/items`, data);
};

export const updateTodoItem = async (
  todoListId: number,
  itemId: number,
  data: UpdateTodoItemDto
): Promise<TodoItem> => {
  return api.put<TodoItem>(`/api/todolists/${todoListId}/items/${itemId}`, data);
};

export const deleteTodoItem = async (
  todoListId: number,
  itemId: number
): Promise<void> => {
  return api.delete<void>(`/api/todolists/${todoListId}/items/${itemId}`);
};

export const completeAllItems = async (todoListId: number): Promise<{ message: string; completed_count: number }> => {
  return api.post<{ message: string; completed_count: number }>(`/api/todolists/${todoListId}/items/complete-all`, {});
};