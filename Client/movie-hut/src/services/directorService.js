import * as request from './requester';
const baseUrl = 'http://localhost:5400';

const create = (data) => {
  return request.post(`${baseUrl}/director/create`, data);
};
const getAll = () => {
  return request.get(`${baseUrl}/director/all`);
};
const getOne = (id) => {
  return request.get(`${baseUrl}/director/${id}`);
};
const del = (id) => {
  return request.del(`${baseUrl}/director/${id}`)
}
export { create, getAll, getOne,del };
