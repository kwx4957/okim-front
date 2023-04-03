import store from "@/store";
import TokenService from "@/utils/TokenService";

function setInterceptors(instance) {
    const accessToken = new TokenService().getAccessToken();
    instance.interceptors.request.use(
        config => {
            config.headers.Authorization = "Bearer " + (store.getters['userAccessToken'] || accessToken);
            return config;
        },
        error => Promise.reject(error.response),
    );
    instance.interceptors.response.use(
        config => config,
        error => Promise.reject(error.response),
    );
    return instance;
}

export { setInterceptors };
