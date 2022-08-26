import * as request from "./requester"
const baseUrl = 'http://localhost:5400'

const create = (data) => {
    return request.post(`${baseUrl}/movies/create`, data)
}
export{
    create
}