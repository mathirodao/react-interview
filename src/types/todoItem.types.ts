export interface TodoItem {
  id: number;
  title: string;
  description?: string; 
  completed: boolean;
}

export interface CreateTodoItemDto {
  title: string;
  description?: string; 
  completed?: boolean;
}

export interface UpdateTodoItemDto {
  title?: string;
  description?: string; 
  completed?: boolean;
}

export interface ToggleTodoItemDto {
  completed: boolean;
}