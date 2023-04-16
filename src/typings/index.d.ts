type ArticleTypes = 'id' | 'img' | 'preview' | 'text' | 'title'

export interface Article {
    [key: ArticleTypes]: 'string'
}

export interface ArticleTable extends Article {
    tableName? : string
}