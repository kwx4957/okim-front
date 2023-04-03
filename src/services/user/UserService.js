import {
    checkEmailDuplicate,
    checkNickNameDuplicate,
    sendVerificationCodeToEmail,
    signupUser,
    getProfileInfo,
    updateProfile,
} from "@/api/user";

const userService = {
    async singup(data) {
        const response = await signupUser(data);
        return response.data;
    },

    async sendVerificationCode(email) {
        const response = await sendVerificationCodeToEmail(email);
        return response.data;
    },

    async checkEmailDuplicate(email) {
        const response = await checkEmailDuplicate(email);
        return response.data;
    },

    async checkNicknameDuplicate(nickname) {
        const response = await checkNickNameDuplicate(nickname);
        return response.data;
    },

    async getProfileInfo(userId) {
        const response = await getProfileInfo(userId);
        return response.data;
    },

    async updateProfile(userId, data){
        const response = await updateProfile(userId, data);
        return response.data;
    }
};





function saveUserToLocalStorage(user) {
    localStorage.setItem('currentUser', user)
}

function getUserFromLocalStorage() {
    return localStorage.getItem('currentUser')
}

export {
    saveUserToLocalStorage,
    getUserFromLocalStorage,
    userService
}