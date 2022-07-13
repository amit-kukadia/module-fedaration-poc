import httpClient from '../../../config/httpClient';

const ITEM_ID = sessionStorage.getItem("itemId");
const END_POINT = `/v1/item/${ITEM_ID}`;

export default {
  get() {
    return httpClient.get(`${END_POINT}`);
  },
  add(params) {
    return httpClient.post(`${END_POINT}`, params);
  },
  update(payload) {
    return httpClient.put(`${END_POINT}`, payload);
  }
}
