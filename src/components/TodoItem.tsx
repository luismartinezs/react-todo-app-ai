import { Todo, TodoHandlers } from "./TodoTypes";
import styles from "./TodoList.module.css";

const TodoItem: React.FC<Todo & TodoHandlers> = (props) => {
  const textStyle = {
    textDecoration: props.completed ? "line-through" : "none",
    fontFamily: "sans-serif",
    fontSize: "1.2rem",
    color: props.completed ? "#ccc" : "#3498db",
    transition: "color 0.2s ease",
  };

  const checkboxStyle = {
    backgroundColor: props.completed ? "#3498db" : "#fff",
  };

  return (
    <li className={styles.todoItem}>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={() => props.onComplete(props.id)}
        className={styles.todoCheckbox}
        style={checkboxStyle}
      />
      <span className={styles.todoText} style={textStyle}>
        {props.text}
      </span>
      <button
        onClick={() => props.onDelete(props.id)}
        className={styles.todoButton}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
