import Vuex from 'vuex';
import TokenService from "@/utils/TokenService";
import { saveUserToLocalStorage, getUserFromLocalStorage} from "@/services/user/UserService";
import {
    loginUser,
    userInfo
} from "@/api/auth";
import task from "@/store/modules/tasks";
import item from "@/store/modules/item";


export default new Vuex.Store({
    modules: {
        task,
        item
    },
    state: {
        userId: 0,
        user: {},
        accessToken: '',
        refreshToken: ''
    },
    mutations: {
        SET_USER_ID(state, userId){
            state.userId = userId;
        },
        SET_USER(state, user) {
            state.user = user
        },
        SET_ACCESS_TOKEN(state, accessToken) {
            state.accessToken = accessToken
        },

        SET_REFRESH_TOKEN(state, refreshToken) {
            state.refreshToken = refreshToken
        },

        CLEAR_USER_LOGIN_DATA(state) {
            state.user = null;
            state.refreshToken = null;
            state.accessToken = null;
        }
    }, actions: {
        // [LoginForm]
        async LOGIN({commit}, data) {
            // 1. 로그인
            const response = await loginUser(data);

            // 2. 토큰 및 유저 ID 저장
            const tokenService = new TokenService();
            commit('SET_ACCESS_TOKEN', response.data.data.accessToken);
            commit('SET_REFRESH_TOKEN', response.data.data.refreshToken);
            commit('SET_USER_ID', response.data.data.userId)
            localStorage.setItem('userId', response.data.data.userId);
            tokenService.setRefreshToken(response.data.data.refreshToken);
            tokenService.setAccessToken(response.data.data.accessToken);

            // 3. 유저 정보 요청
            const userInfoResponse = await userInfo(response.data.data.userId);


            // 4. 유저 정보 저장
            commit('SET_USER', userInfoResponse.data.data);
            saveUserToLocalStorage(JSON.stringify(userInfoResponse.data.data));
            return response
        },
        LOGOUT({commit}) {
            commit('CLEAR_USER_LOGIN_DATA');
            const tokenService = new TokenService();
            tokenService.deleteAll();
        },
    }, getters: {
        userNickname(state) {
            return state.user.nickname || JSON.parse(getUserFromLocalStorage()).nickname;
        },
        userProfileLink(state){
            return state.user.profileImage || JSON.parse(getUserFromLocalStorage() || "{}").profileImage;
        },
        isLoggedIn(state) {
            return state.user === {} || getUserFromLocalStorage() !== null;
        },
        userAccessToken(state) {
            return state.accessToken || new TokenService().getAccessToken();
        },
        userRefreshToken(state) {
            return state.refreshToken || new TokenService().getRefreshToken();
        }
    }
});