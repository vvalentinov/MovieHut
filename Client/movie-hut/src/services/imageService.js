import * as imageRequester from './requesters/imageRequester';
const baseUrl = 'http://localhost:5400';

const upload = (data, folderName) => {
  return imageRequester.post(`${baseUrl}/images/addImage?folderName=${folderName}`, data);
};
export { upload };
