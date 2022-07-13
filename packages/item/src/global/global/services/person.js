import httpClient from '../../config/httpClient';

const USER_ID = localStorage.getItem("userId");
const END_POINT = `/v1/person/${USER_ID}`;

export default {
  update(params) {
    return httpClient.put(`${END_POINT}`, params);
  }
}
