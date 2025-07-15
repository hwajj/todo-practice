import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoState } from "../atoms/todoAtom";
import type { TodoItem } from "../atoms/todoAtom";
const AddTodo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useRecoilState(todoState);

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo: TodoItem = { text: input, done: false };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일 입력"
      />
      <button onClick={addTodo}>추가</button>
    </div>
  );
};

export default AddTodo;
