import { atom, type AtomEffect } from "recoil";
import type { TodoItem } from "../types/TodoItem.ts";

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const todoAtom = atom<TodoItem[]>({
  key: "todoState",
  default: [],
  effects: [localStorageEffect("todoState")],
});
