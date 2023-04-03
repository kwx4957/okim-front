import axios from "axios";
import {setInterceptors} from "@/api/config/config";

const authBaseUrl = process.env.VUE_APP_AUTH_SERVER_URL;
const apiBaseUrl = process.env.VUE_APP_API_SERVER_URL;



function create(url, options) {
    const instance = axios.create(Object.assign({ baseURL: url }, options));
    return instance;
}

function createWithAuth(url, options) {
    const instance = axios.create(Object.assign({ baseURL: url }, options));
    return setInterceptors(instance);
}

export const auth = create(authBaseUrl);
export const api = create(apiBaseUrl);
export const apiWithAuth = createWithAuth(apiBaseUrl);

