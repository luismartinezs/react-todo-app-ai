import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Todo } from "./components/TodoTypes";

const getTodos = () =>
  axios.get("http://localhost:3000/api/todos").then((res) => res.data);

const addTodo = (text: string) =>
  axios
    .post("http://localhost:3000/api/todos", { text })
    .then((res) => res.data);

const updateTodo = (todo: Partial<Todo> & { id: string }) => {
  return axios
    .put(`http://localhost:3000/api/todos/${todo.id}`, todo)
    .then((res) => res.data);
}

const deleteTodo = (id: string) =>
  axios.delete(`http://localhost:3000/api/todos/${id}`).then((res) => res.data);

export const useTodos = () => {
  const { data, isLoading, error } = useQuery("todos", getTodos);

  return {
    todos: data,
    isLoading,
    error,
  };
};

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
