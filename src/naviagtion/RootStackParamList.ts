import { IProductListItem } from "../interfaces";

export type RootStackParamList = {
  HomeScreen: undefined,
  DetailProductScreen: {
    productId: number
  }
}