import httpClient from "../global/config/httpClient";

const USER_ID = localStorage.getItem("userId");
const END_POINT = `/v1/person/${USER_ID}/preference`;

export default {
  get() {
    return httpClient.get(`${END_POINT}`);
  },
  update(params) {
    return httpClient.post(`${END_POINT}`, params);
  }
}
