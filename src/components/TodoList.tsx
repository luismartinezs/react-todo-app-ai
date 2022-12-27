import React, { useState } from 'react';
import styles from './TodoList.module.css';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { Todo, TodoListProps } from './TodoTypes';

const TodoList: React.FC<TodoListProps> = (props) => {
  const [todos, setTodos] = useState(props.todos);

  const handleSubmit = (text: string) => {
    setTodos((prevTodos) => {
      const newTodo: Todo = {
        id: prevTodos.length + 1,
        text: text,
        completed: false,
      };
      return [...prevTodos, newTodo];
    });
  };

  const handleDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
