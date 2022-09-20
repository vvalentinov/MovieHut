import * as request from './requesters/requester';
const baseUrl = 'http://localhost:5400';

const create = (data) => {
  return request.post(`${baseUrl}/actors/create`, data);
};
const getAll = () => {
  return request.get(`${baseUrl}/actors/all`);
};
const getOne = (id) => {
  return request.get(`${baseUrl}/actors/${id}`);
};
const del = (id) => {
  return request.del(`${baseUrl}/actors/${id}`)
}
const edit = (data) => {
  return request.put(`${baseUrl}/actors/update`, data)
}
export { create, getAll, getOne, del, edit };
