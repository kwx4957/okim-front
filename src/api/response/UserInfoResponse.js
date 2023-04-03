export default class UserInfoResponse {
    constructor(nickname, githubId, profileImage, selfDesc, origanization) {
        this.nickname = nickname;
        this.githubId = githubId;
        this.profileImage = profileImage;
        this.selfDesc = selfDesc;
        this.orifanization = origanization;
    }

    /**
     *
     * @param data 서버로 부터 받은 응답.
     */
    static from(data) {
        return new UserInfoResponse();
    }
}
