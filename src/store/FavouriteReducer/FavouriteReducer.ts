import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserListItem } from '../../interfaces/index';

interface FavouriteState {
  item: IUserListItem[]
}

const initialState = { 
  item: [] 
} as FavouriteState

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavouriteUser(state, action: PayloadAction<IUserListItem>) {
      state.item.push(action.payload)
    },
    deleteFavouriteUser(state, action: PayloadAction<string>) {
      state.item.forEach((user, idx) => {
        if (user.login === action.payload) {
          state.item.splice(idx, 1)
          return
        }
      })
    }
  },
})

export const { addFavouriteUser, deleteFavouriteUser } = favouriteSlice.actions
export default favouriteSlice.reducer