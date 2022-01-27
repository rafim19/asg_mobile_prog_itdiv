import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import FavouriteReducer from './FavouriteReducer/FavouriteReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer = combineReducers({
  favourite: FavouriteReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({ 
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
    serializableCheck: false
  })
})
const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export { store, persistor }