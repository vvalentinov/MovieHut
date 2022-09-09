const request = async (method, url, data) => {
  try {
    const user = localStorage.getItem('auth');
    let auth = JSON.parse('{}');
    if (user !== 'undefined' && user) {
      auth = JSON.parse(user);
    }

    let headers = {};
    if (auth?.accessToken) {
      headers['Authorization'] = 'Bearer ' + auth.accessToken;
    }
    let beginningRequest;
    if (method === 'GET') {
      beginningRequest = fetch(url, { headers });
    } else {
      beginningRequest = fetch(url, {
        method,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }
    const response = await beginningRequest;
    let result = null;
    if (response.ok) {
      result = await response.json();
    } else {
      console.log(response);
      const res = await response.json();
      let errorMessages = createErrorMessage(res.errors);
      throw new Error(errorMessages);
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
const createErrorMessage = (errors) => {
  let result = '';
  for (const error in errors) {
    result += errors[error][0] + '\n';
  }
  return result;
};
export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');
export const patch = request.bind({}, 'PATCH');
