import { apiRequest } from './client'

export interface LoginResponse {
  token: string
}

export function loginAdmin(password: string): Promise<LoginResponse> {
  return apiRequest('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
}
