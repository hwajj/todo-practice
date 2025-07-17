import { useState } from "react";
import "@/Todo.css";
import { TodoItem } from "@/types/TodoItem";
import { TodoService } from "@/service/TodoService/TodoService";

interface AddTodoProps {
  service: TodoService;
}

const AddTodo = ({ service }: AddTodoProps) => {
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo: TodoItem = { text: input, done: false };
    service.addTodo(newTodo); // 서비스 호출
    setInput("");
  };

  return (
    <div className="add-todo-container">
      <input
        className="todo-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일 입력"
      />
      <button className="add-button" onClick={addTodo}>
        추가
      </button>
    </div>
  );
};

export default AddTodo;
