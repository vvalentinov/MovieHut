import * as request from './requesters/requester';
const baseUrl = 'http://localhost:5400';

const create = (data) => {
    return request.post(`${baseUrl}/shows/create`, data);
};
const getMine = () => {
    return request.get(`${baseUrl}/shows/mine`);
};
const getAll = () => {
    return request.get(`${baseUrl}/shows/all`);
};
const getOne = (id) => {
    return request.get(`${baseUrl}/shows/${id}`);
};
const del = (id) => {
    return request.del(`${baseUrl}/shows/${id}`)
}
const edit = (data) => {
    return request.put(`${baseUrl}/shows/update`, data)
}
export { create, getAll, getMine, getOne, del, edit};
