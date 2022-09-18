import * as imageRequester from './requesters/imageRequester';
const baseUrl = 'http://localhost:5400';

const upload = (data) => {
  return imageRequester.post(`${baseUrl}/images/addImage`, data);
};
export { upload };
