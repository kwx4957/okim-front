import {api, apiWithAuth} from "@/api/index";


// 그룹 테스트 리스트 조회
function getGroupTasksByGroupId(groupId) {
    return api.get(`/api/v1/group/${groupId}/tasks`)
}


// 테스크 생성
function createAdhocTask() {
    return apiWithAuth.post("/api/v1/tasks", {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// 테스트 아이템 조회
function getTaskItemsByTaskId(taskId) {
    return api.get(`/api/v1/tasks/${taskId}/items`);
}

export {
    createAdhocTask,
    getTaskItemsByTaskId,
    getGroupTasksByGroupId
}