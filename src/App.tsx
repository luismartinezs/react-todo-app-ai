import "./App.css";
import TodoList from "./components/TodoList";
import { Todo } from "./components/TodoTypes";

function App() {
  const initialTodos: Todo[] = [];

  return (
    <div className="App">
      <TodoList todos={initialTodos} />
    </div>
  );
}

export default App;
