import {api, apiWithAuth} from "@/api/index";

// 회원가입
function signupUser(data) {
    return api.post("/api/v1/user/signup",data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// 이메일 중복체크
function checkEmailDuplicate(email){
    return api.get(`/api/v1/email/${email}/check`);
}

// 닉네임 중복체크
function checkNickNameDuplicate(nickName){
    return api.get(`/api/v1/nickname/${nickName}`);
}

// 인증번호 보내기
function sendVerificationCodeToEmail(emailData){
    return api.post(`/api/v1/email`, emailData, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}

// 프로필 조회
function getProfileInfo(userId) {
    return api.get(`/api/v1/user/${userId}`)
}

// 프로필 업데이트
function updateProfile(userId, data) {
    return apiWithAuth.put(`/api/v1/user/${userId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


export {
    signupUser,
    checkNickNameDuplicate,
    checkEmailDuplicate,
    sendVerificationCodeToEmail,
    getProfileInfo,
    updateProfile
}