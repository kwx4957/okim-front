import {apiWithAuth} from "@/api";

const taskService = {

    // TODO 버그 발생으로 인해 임시로 바로 api 에 의존
    // 임시 테스크 생성
    async createAdhocTask() {
        return apiWithAuth.post(`/api/v1/tasks`);
    },


    async getAllItemsByTaskId(taskId) {
        return apiWithAuth.get(`/api/v1/tasks/${taskId}/items`);
    },

    // 유저의 모든 테스크 조회
    async getAllUserTasks(userId) {
        return apiWithAuth.get(`/api/v1/user/${userId}/tasks`);
    },
}


export default taskService