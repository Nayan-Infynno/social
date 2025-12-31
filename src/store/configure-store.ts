import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import likePostSlice from "../slices/like-post-slice";

const persistConfig = {
  key: "root",
  whitelist: ["likePost"],
  storage: AsyncStorage,
};

const reducer = combineReducers({
  likePost: likePostSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export { persistor };
