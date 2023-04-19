type ArticleTypes = 'id' | 'img' | 'preview' | 'text' | 'title'

export interface Article {
    [key: ArticleTypes]: 'string'
}

export interface ArticleTable extends Article {
    tableName? : string
}


export type AlertTypes = 'none' | 'primary' | 'success' | 'error'
export type AlertId = string | number
export interface Alert {
    id: AlertId,
    text: string,
    type: AlertTypes,
    closable: boolean,
    autoClosable: boolean
}