import { configureStore } from "@reduxjs/toolkit";            //npm i
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist"; //npm i redux redux-persist
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import user from "./userSlice"; 

// import userReducer from "./userSlice";
// const store = configureStore({  reducer: { user }});
// export default store;

const persistConfig = { key: "root", storage};

const rootReducer = combineReducers({  user  }); //user,a,b if more than one slice

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
 });

const persistor = persistStore(store);

export { store, persistor };
