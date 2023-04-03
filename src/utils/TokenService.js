class TokenService {
    constructor() {
        this.accessToken = localStorage.getItem('accessToken') || '';
        this.refreshToken = localStorage.getItem('refreshToken') || '';
    }

    getAccessToken() {
        return this.accessToken;
    }

    getRefreshToken() {
        return this.refreshToken;
    }

    setAccessToken(newToken) {
        this.accessToken = newToken;
        localStorage.setItem('accessToken', newToken);
    }

    setRefreshToken(newRefreshToken) {
        this.refreshToken = newRefreshToken;
        localStorage.setItem('refreshToken', newRefreshToken);
    }

    deleteAll() {
        localStorage.clear();
    }
}

export default TokenService;