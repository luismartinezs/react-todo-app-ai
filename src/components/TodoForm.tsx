import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={handleChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;