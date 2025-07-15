import { useRecoilState } from "recoil";
import { todoState } from "../atoms/todoAtom";

const TodoList = () => {
  const [todos, setTodos] = useRecoilState(todoState);

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
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
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
      <button onClick={resetTodos}>초기화</button>
    </div>
  );
};

export default TodoList;
