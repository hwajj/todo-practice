import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface TodoItem {
  text: string;
  done: boolean;
}

const initialState: TodoItem[] = [];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ text: action.payload, done: false });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state[action.payload];
      if (todo) todo.done = !todo.done;
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    reset: () => initialState,
  },
});

export const { addTodo, toggleTodo, removeTodo, reset } = todoSlice.actions;
export default todoSlice.reducer;
