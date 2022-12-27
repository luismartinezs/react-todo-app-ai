export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoHandlers {
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

export interface TodoListProps {
  todos: Todo[];
}