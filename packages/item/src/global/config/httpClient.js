import axios from 'axios'
import ConfigURL from "./vue.config.js"
import GetValueFromCookie from "../helpers/getCookieData.js"

const httpClient = axios.create({
    baseURL: ConfigURL, //will pick this url from config file
    timeout: 500000,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + GetValueFromCookie("api_token")
    }
});

const errorInterceptor = error => {
    // handle error
    if (!error.response) {
        return Promise.reject(error);
    }

    // all the other error responses
    switch (error.response.status) {
        case 400:
            break;

        case 401: // authentication error, logout the user
            window.location.href = "/logout";
            break;

        default:
    }
    return Promise.reject(error);
};

const responseInterceptor = response => {
    switch (response.status) {
        case 200:
            break;
        default:
    }
    return response;
}
httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
