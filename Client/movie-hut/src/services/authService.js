import * as request from "./requester"
const baseUrl = 'http://localhost:5401'

const login = (data) => {
    return request.post(`${baseUrl}/identity/login`, data)
}
const register = (data) => {
    return request.post(`${baseUrl}/identity/register`, data)
}
export{
    login,
    register
}