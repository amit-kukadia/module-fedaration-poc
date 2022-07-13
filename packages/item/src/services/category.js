import httpClient from "../../../config/httpClient";

const END_POINT = `/v1/category`;

export default {
  getAttributes(id) {
    return httpClient.get(`${END_POINT}/${id}/attributes`);
  }
}
