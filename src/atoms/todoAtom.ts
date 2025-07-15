import { atom, type AtomEffect } from "recoil";

export type TodoItem = {
  text: string;
  done: boolean;
};

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

export const todoState = atom<TodoItem[]>({
  key: "todoState",
  default: [],
  effects: [localStorageEffect("todoState")],
});
