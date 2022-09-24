import * as imageRequester from './requesters/imageRequester';
const baseUrl = 'http://localhost:5400';

const upload = (data) => {
  return imageRequester.post(`${baseUrl}/images/addImage`, data);
};
const update = (data) => {
  return imageRequester.put(`${baseUrl}/images/updateImage`, data);
};
export { upload, update };
