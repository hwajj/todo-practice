import { useRecoilState } from "recoil";
import { todoAtom } from "../atoms/todoAtom";
import "@/Todo.css"; // 스타일 파일 import

const TodoList = () => {
  const [todos, setTodos] = useRecoilState(todoAtom);

  const toggleDone = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo,
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const resetTodos = () => setTodos([]); // 초기화

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={`todo-item ${todo.done ? "done" : ""}`}>
            <label className="todo-label">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(index)}
              />
              <span>{todo.text}</span>
            </label>
            <button className="delete-button" onClick={() => deleteTodo(index)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
      <button className="reset-button" onClick={resetTodos}>
        초기화
      </button>
    </div>
  );
};

export default TodoList;
