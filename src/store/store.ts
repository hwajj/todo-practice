import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

// export const store = configureStore({
//   reducer: {
//     todos: todoReducer,
//   },
// });
const persistedTodos = JSON.parse(localStorage.getItem("todoState") || "[]");

const initialState = {
  todos: persistedTodos, // 로컬스토리지 데이터로 초기화
};
const persistMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState() as RootState;
  localStorage.setItem("todoState", JSON.stringify(state.todos));
  return result;
};
export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
  preloadedState: initialState,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
