import {ProductCrop} from "@/typings";

export interface ProductState {
}

export interface EditProduct extends ProductCrop{
  oldHru: string,
  newHru: string
}

export interface ProductsFilter {
  catalogSection?: string
}


