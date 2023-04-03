import {auth, apiWithAuth} from "@/api/index";

// 로그인
function loginUser(data) {
    return auth.post("/api/v1/auth/authenticate", data);
}

function userInfo(userId) {
    return apiWithAuth.get(`/api/v1/user/${userId}`);
}

export {loginUser, userInfo}