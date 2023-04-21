import ERROR_CODES from '@/config/error-codes'

export function error(code: string) : string{
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}