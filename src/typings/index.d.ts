type ArticleTypes = 'id' | 'img' | 'preview' | 'text' | 'title' | 'type'

// todo: узнать, почему не работает
// export interface Article {
//     [key: ArticleTypes]: 'string'
// }

export interface Article {
    id: string,
    img: string,
    preview: string,
    text: string,
    title: string,
    date: null | Date,
    type?: string
}

export interface ArticleFetchInfo {
    id: string,
    tableName: string
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

export interface AuthInfo {
    email: string,
    password: string
}
export type skipAutoTypes = 'singIn' | 'singUp'

export type skipAutoItem = null | Date | string

export interface skipAutoInterface {
    auth?: null | Date,
    registration?: null | Date,
}

export type routeHeaderTypes = 'static' | 'dynamic'

//todo: уточнить у firebase точное определение jwt-token payload
//todo: избавиться от any
export type fbUserPayload = Object | any

export interface User {
    email: string,
    email_verified: boolean,
    auth_time: number,
    user_id: string,
    exp_time:  fbnumber // истекает
}