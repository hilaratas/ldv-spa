import {CatalogSection} from "@/typings";


export interface CatalogState {
  catalogSections: Array<CatalogSection>
}

export interface CatalogSectionPayLoad {
  img?: string,
  title: string
}
