import { api } from './api';
import { TodoList, CreateTodoListDto, UpdateTodoListDto } from '../types/todoList.types';

const BASE_PATH = '/api/todolists';

export const getAllTodoLists = async (): Promise<TodoList[]> => {
  return api.get<TodoList[]>(BASE_PATH);
};

export const getTodoListById = async (id: number): Promise<TodoList> => {
  return api.get<TodoList>(`${BASE_PATH}/${id}`);
};

export const createTodoList = async (data: CreateTodoListDto): Promise<TodoList> => {
  return api.post<TodoList>(BASE_PATH, data);
};

export const updateTodoList = async (
  id: number,
  data: UpdateTodoListDto
): Promise<TodoList> => {
  return api.put<TodoList>(`${BASE_PATH}/${id}`, data);
};

export const deleteTodoList = async (id: number): Promise<void> => {
  return api.delete<void>(`${BASE_PATH}/${id}`);
};