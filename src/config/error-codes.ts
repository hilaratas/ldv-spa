interface ErrorCodes {
  [key: string] : string
}

const ERROR_CODES : ErrorCodes = {
  EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
  INVALID_PASSWORD: 'Пароль неверный',
  USER_DISABLED: 'Учетная запись пользователя отключена администратором',
  EMAIL_EXISTS: 'Пользователь с таким адресом электронной почты уже зарегистрирован',
  SING_UP_OPERATION_NOT_ALLOWED: 'Для этого сайта недоступна регистрация с помощью лектронной почты и пароля',
  auth: 'Пожалуйста войдите в систему'
}

export default ERROR_CODES

