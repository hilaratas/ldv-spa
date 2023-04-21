interface ErrorCodes {
  [key: string] : string
}

const ERROR_CODES : ErrorCodes = {
  EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
  INVALID_PASSWORD: 'Пароль неверный',
  USER_DISABLED: 'Учетная запись пользователя отключена администратором',
  auth: 'Пожалуйста войдите в систему'
}

export default ERROR_CODES

