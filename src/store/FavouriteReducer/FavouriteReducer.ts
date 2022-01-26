import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { iteratorSymbol } from 'immer/dist/internal';
import { IProductListItem } from '../../interfaces/index';

interface FavouriteState {
  item: IProductListItem[]
}

const initialState = { item: [] } as FavouriteState

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavouriteProduct(state, action: PayloadAction<IProductListItem>) {
      state.item.push(action.payload)
    },
    deleteFavouriteProduct(state, action: PayloadAction<number>) {
      state.item.forEach((product, idx) => {
        if (product.id === action.payload) {
          state.item.splice(idx, 1)
          return
        }
      })
    }
    // increment(state) {
    //   state.value++
    // },
    // decrement(state) {
    //   state.value--
    // },
    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.value += action.payload
    // },
  },
})

export const { addFavouriteProduct, deleteFavouriteProduct } = favouriteSlice.actions
export default favouriteSlice.reducer