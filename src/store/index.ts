import { combineReducers, configureStore } from '@reduxjs/toolkit'
import FavouriteReducer from './FavouriteReducer/FavouriteReducer'

const rootReducer = combineReducers({
  favourite: FavouriteReducer
})

export const store = configureStore({ reducer: rootReducer })