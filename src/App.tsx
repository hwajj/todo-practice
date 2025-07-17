import { RecoilRoot } from "recoil";
import AddTodo from "@/component/AddTodo";
import RecoilNexus from "recoil-nexus";
import { Provider } from "react-redux";
import { ReduxTodoService } from "@/service/TodoService/ReduxTodoService";
import TodoListDI from "@/component/TodoListDI";
import { RecoilTodoService } from "@/service/TodoService/RecoilTodoService";
import { store } from "@/store";

function App() {
  const useRedux = true; // true면 Redux, false면 Recoil

  const todoService = useRedux
    ? new ReduxTodoService()
    : new RecoilTodoService();

  return useRedux ? (
    <Provider store={store}>
      <AddTodo service={todoService} />
      <TodoListDI service={todoService} />
    </Provider>
  ) : (
    <RecoilRoot>
      <RecoilNexus />
      <AddTodo service={todoService} />
      <TodoListDI service={todoService} />
    </RecoilRoot>
  );
}

export default App;
