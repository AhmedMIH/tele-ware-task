import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://api.exchangerate.host/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
})

export const axiosRequest = async ({ ...options }) => {
    const handleSuccess = (response) => response.data
    const handleError = (error) => {
        const errorMsg = error?.response?.data?.message ?? 'Something went wrong'
        throw new Error(errorMsg)
    }

    return apiClient(options).then(handleSuccess).catch(handleError)
}

