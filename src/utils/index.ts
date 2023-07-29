/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { toast } from 'react-toastify'

export interface ErrorMutate {
  code: number
  error_code: string
  message: string | string[]
  dynamic_data?: {}
}

export const getErrorMessage = (error: ErrorMutate) => {
  if (typeof error?.message === 'string') {
    return error?.message
  }

  return 'error:INTERNAL_ERROR'
}

export const handleErrorMutate = (error: any) => {
  toast.error(getErrorMessage(error))
}
