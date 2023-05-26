import {CatalogSection, CatalogSectionCrop} from "@/typings";

export interface CatalogSections {
  [key: string]: CatalogSectionCrop
}

export interface CatalogState extends CatalogSections {

}

export interface CatalogSectionPayLoad {
  img: string,
  title: string
}

export interface EditCatalogSection {
  oldHru: string,
  newHru: string,
  img: string,
  title: string
}


