import {api} from "@/api/index";


// 전체 그룹 조회
function getGroups () {
    return api.get(`/api/v1/groups`)
}

function getGroupTasks(groupId, page, size) {
    if(page < 0 || (size < 0 || size > 10)){
        return
    }
    return api.get(`/api/v1/groups/${groupId}/tasks`, { page: page, size: size })
}

export {
    getGroups,
    getGroupTasks
}