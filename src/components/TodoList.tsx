import React from "react";
import styles from "./TodoList.module.css";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { Todo, TodoListProps } from "./TodoTypes";
import { useTodos, useAddTodo, useUpdateTodo, useDeleteTodo } from "../api";

function getTodoById(id: string, todos: Todo[]): Todo | null {
  const todo = todos.find((t) => t.id === id);
  return todo || null;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  const { todos, isLoading: isTodosLoading, error: todosError } = useTodos();
  const {
    addTodo,
    isLoading: isAddingTodo,
    error: addTodoError,
  } = useAddTodo();
  const {
    updateTodo,
    isLoading: isUpdatingTodo,
    error: updateTodoError,
  } = useUpdateTodo();
  const {
    deleteTodo,
    isLoading: isDeletingTodo,
    error: deleteTodoError,
  } = useDeleteTodo();

  if (isTodosLoading || isAddingTodo || isUpdatingTodo || isDeletingTodo) {
    return <div>Loading...</div>;
  }

  if (todosError || addTodoError || updateTodoError || deleteTodoError) {
    return (
      <div className={styles.errorMessage}>
        Error:
        {todosError ? ` ${todosError.message}` : ""}
        {addTodoError ? ` ${addTodoError.message}` : ""}
        {updateTodoError ? ` ${updateTodoError.message}` : ""}
        {deleteTodoError ? ` ${deleteTodoError.message}` : ""}
      </div>
    );
  }

  const handleSubmit = (text: string) => {
    addTodo(text);
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  const handleComplete = (id: string) => {
    const todo = getTodoById(id, todos);
    if (!todo) {
      return;
    }
    updateTodo({
      id,
      completed: !todo.completed,
      text: todo.text,
    });
  };

  return (
    <div>
      <TodoForm onSubmit={handleSubmit} />
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
