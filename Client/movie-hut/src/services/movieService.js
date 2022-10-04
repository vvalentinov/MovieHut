import * as request from './requesters/requester';
const baseUrl = 'http://localhost:5400';

const create = (data) => {
    return request.post(`${baseUrl}/movies/create`, data);
};
const getMine = () => {
    return request.get(`${baseUrl}/movies/mine`);
};
const getAll = () => {
    return request.get(`${baseUrl}/movies/all`);
};
const getOne = (id) => {
    return request.get(`${baseUrl}/movies/${id}`);
};
const del = (id) => {
    return request.del(`${baseUrl}/movies/${id}`)
}
const edit = (data) => {
    return request.put(`${baseUrl}/movies/update`, data)
}
export { create, getAll, getMine, getOne, del, edit};
