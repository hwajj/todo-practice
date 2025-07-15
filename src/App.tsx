import { RecoilRoot } from "recoil";
import TodoList from "./component/TodoList.tsx";
import AddTodo from "./component/AddTodo.tsx";

function App() {
  return (
    <RecoilRoot>
      <AddTodo />
      <TodoList />
    </RecoilRoot>
  );
}

export default App;
