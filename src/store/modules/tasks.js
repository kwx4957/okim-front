import TaskLocalStorageService from "@/utils/TaskLocalStorageService";

const task = {
    state: {
        adhocTaskId : 0
    },
    mutations: {
        SET_ADHOC_TASK(state, adhocTaskId){
            state.adhocTaskId = adhocTaskId;
        }
    },
    actions: {
        saveAdhocTask({commit}, adhocTaskId) {

            // 임시 테스크 저장
            commit('SET_ADHOC_TASK', adhocTaskId);

            // 로컬스토리지 저장
            const taskLocalStorageService = new TaskLocalStorageService();
            taskLocalStorageService.setAdhocTaskId(adhocTaskId)
        },
    },
    getters: {  }
}

export default task;
