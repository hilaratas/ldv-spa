import {ProductCrop} from "@/typings";

export interface ProductState {
}

export interface EditProduct extends ProductCrop{
  oldProdHru: string,
  newProdHru: string
}

export interface ProductsFilter {
  catalogSection?: string
}

export interface changeSectionHru {
  oldSectionHru: string
  newSectionHru: string
}


