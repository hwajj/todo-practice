import { getRecoil, setRecoil } from "recoil-nexus";
import type { TodoService } from "./TodoService";
import type { TodoItem } from "../../types/TodoItem.ts";
import { todoAtom } from "@/atoms/todoAtom";

export class RecoilTodoService implements TodoService {
  getTodos(): TodoItem[] {
    return getRecoil(todoAtom);
  }

  subscribe(callback: (todos: TodoItem[]) => void): () => void {
    // Recoil은 전역 subscribe가 없어서 local subscribe 구현
    const observer = setInterval(() => {
      callback(getRecoil(todoAtom));
    }, 100); // 폴링 방식 (단순화)
    return () => clearInterval(observer);
  }

  addTodo(text: string): void {
    const current = getRecoil(todoAtom);
    setRecoil(todoAtom, [...current, { text, done: false }]);
  }

  toggleTodo(index: number): void {
    const current = getRecoil(todoAtom);
    const updated = current.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo,
    );
    setRecoil(todoAtom, updated);
  }

  removeTodo(index: number): void {
    const current = getRecoil(todoAtom);
    setRecoil(
      todoAtom,
      current.filter((_, i) => i !== index),
    );
  }

  reset(): void {
    setRecoil(todoAtom, []);
  }
}
