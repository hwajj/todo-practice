import { store } from "@/store";
import { addTodo, removeTodo, reset, toggleTodo } from "@/store/todoSlice";
import type { TodoService } from "./TodoService";
import type { TodoItem } from "@/types/TodoItem";

export class ReduxTodoService implements TodoService {
  getTodos(): TodoItem[] {
    return store.getState().todos;
  }

  subscribe(callback: (todos: TodoItem[]) => void): () => void {
    const unsubscribe = store.subscribe(() => {
      callback(store.getState().todos);
    });
    return unsubscribe;
  }

  addTodo(text: string): void {
    store.dispatch(addTodo(text));
  }

  toggleTodo(index: number): void {
    store.dispatch(toggleTodo(index));
  }

  removeTodo(index: number): void {
    store.dispatch(removeTodo(index));
  }

  reset(): void {
    store.dispatch(reset());
  }
}
