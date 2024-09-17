import { configureStore } from '@reduxjs/toolkit';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import sidebarReducer from './reducers/sidebarReducer';
import authReducer from "./reducers/authReducer";
import storage from 'redux-persist/lib/storage';
import tabsReducer from './reducers/tabsReducer';
import authenticationReducer  from './reducers/twoFactorReducer';
import isSubmittingReducer from './reducers/submittingReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
  tabs: tabsReducer,
  authentication:authenticationReducer,
  submitting: isSubmittingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store =  configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };