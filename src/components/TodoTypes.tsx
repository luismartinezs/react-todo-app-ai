export interface Todo {
  id: string;
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