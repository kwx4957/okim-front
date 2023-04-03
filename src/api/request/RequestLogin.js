export default class RequestLogin {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    /**
     * @param email
     * @param password
     * @returns {RequestLogin}
     */
    static create(email, password){
        return new RequestLogin(email, password)
    }
}
