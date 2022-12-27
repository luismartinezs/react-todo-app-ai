import { useState } from "react";
import styles from "./TodoList.module.css";

const TodoForm: React.FC<{ onSubmit: (text: string) => void }> = ({
  onSubmit,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(text);
    setText('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input value={text} onChange={handleChange} className={styles.formInput} />
      <button type="submit" className={styles.formButton}>Add Todo</button>
    </form>
  );
};

export default TodoForm;