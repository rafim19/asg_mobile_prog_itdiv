export interface IProductListItem {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  imageLink: string,
  rating: {
    rate: number,
    count: number
  }
}