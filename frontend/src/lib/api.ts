import axios from 'axios'

const apiBaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function getApiBaseUrl(): string {
  return apiBaseURL
}



