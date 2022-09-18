import * as request from './requesters/requester';
const baseUrl = 'http://localhost:5400';

const create = (data) => {
  return request.post(`${baseUrl}/directors/create`, data);
};
const getAll = () => {
  return request.get(`${baseUrl}/directors/all`);
};
const getOne = (id) => {
  return request.get(`${baseUrl}/directors/${id}`);
};
const del = (id) => {
  return request.del(`${baseUrl}/directors/${id}`)
}
export { create, getAll, getOne,del };
