import * as request from './requester';
const baseUrl = 'http://localhost:5400';

const create = (data) => {
  return request.post(`${baseUrl}/movies/create`, data);
};
const getMine = () => {
  return request.get(`${baseUrl}/movies/mine`);
};
const getAll = () => {
  //TODO fix the route
  return request.get(`${baseUrl}/movies/mine`);
};
export { create, getAll, getMine };
