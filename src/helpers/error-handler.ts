import { ErrorHandler } from '../types/local'

export function handleError(error: ErrorHandler): void {
  const errorMsg = error.data?.status.error || error.response?.data?.msg || error.message
  console.error(`Error: ${errorMsg}`)
}
