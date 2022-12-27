import React, { useState } from "react";
import styles from "./TodoList.module.css";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import {  TodoListProps } from "./TodoTypes";
import { useTodos, useAddTodo, useUpdateTodo, useDeleteTodo } from "../api";

const TodoList: React.FC<TodoListProps> = (props) => {
  const { todos, isLoading, error } = useTodos();
  const { addTodo } = useAddTodo();
  const { updateTodo } = useUpdateTodo();
  const { deleteTodo } = useDeleteTodo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSubmit = (text: string) => {
    addTodo(text);
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  const handleComplete = (id: number) => {
    updateTodo({ id, completed: true, text: todos.find(todo => todo.id === id).text });
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
