import type { TodoService } from "./TodoService.ts";
import type { TodoItem } from "../../types/TodoItem.ts";

export class ReduxTodoService implements TodoService {
  getTodos(): TodoItem[] {}

  addTodo(text: string): void {}

  removeTodo(index: number): void {}

  reset(): void {}

  subscribe(callback: (todos: []) => void): () => void {
    return function () {};
  }

  toggleTodo(index: number): void {}
}
