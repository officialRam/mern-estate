import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer=combineReducers({user:userReducer});
const persistConfig = {
    key: 'root',
    storage,
    // Optionally, specify any reducer keys that you do not want to persist here
    version: 1,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
//   here middleware is used to tell that the data is not serializable
  middleware:(getDefaltMiddleware)=>
    getDefaltMiddleware({
        serializableCheck:false,
    })
  
})

export const persistor = persistStore(store);