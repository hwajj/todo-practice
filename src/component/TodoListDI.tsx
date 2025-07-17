import { useEffect, useState } from "react";
import { TodoService } from "@/service/TodoService/TodoService";
import { TodoItem } from "@/types/TodoItem";

const TodoList = ({ service }: { service: TodoService }) => {
  const [todos, setTodos] = useState<TodoItem[]>(service.getTodos());

  // 상태 구독
  useEffect(() => {
    const unsubscribe = service.subscribe(setTodos);
    return unsubscribe; // 언마운트 시 구독 해제
  }, [service]);

  const toggleDone = (index: number) => {
    service.toggleTodo(index);
  };

  const deleteTodo = (index: number) => {
    service.removeTodo(index);
  };

  const resetTodos = () => {
    service.reset();
  };

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={`todo-item ${todo.done ? "done" : ""}`}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(index)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(index)}>삭제</button>
          </li>
        ))}
      </ul>
      <button className="delete-button" onClick={resetTodos}>
        초기화
      </button>
    </div>
  );
};

export default TodoList;
