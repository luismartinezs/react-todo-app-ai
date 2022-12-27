import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Todo } from "./components/TodoTypes";

export const useTodos = () => {
  const { data, isLoading, error } = useQuery("todos", () =>
    axios.get("http://localhost:3000/api/todos").then((res) => res.data)
  );

  return {
    todos: data,
    isLoading,
    error,
  };
};

const addTodo = (text: string) =>
  axios
    .post("http://localhost:3000/api/todos", { text })
    .then((res) => res.data);

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  return {
    addTodo: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

const updateTodo = (todo: Partial<Todo> & { id: number }) =>
  axios
    .put(`http://localhost:3000/api/todos/${todo.id}`, todo)
    .then((res) => res.data);

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  return {
    updateTodo: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

const deleteTodo = (id: number) =>
  axios.delete(`http://localhost:3000/api/todos/${id}`).then((res) => res.data);

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  return {
    deleteTodo: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
