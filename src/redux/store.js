import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedTodosReducer = persistReducer(persistConfig, todosReducer);

export const store = configureStore({
  reducer: {
    todos: persistedTodosReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
