import {apiWithAuth} from "@/api/index";


// 아이템 생성
function createItem(item) {
    return apiWithAuth.post(`/api/v1/item`, item)
}

// 아이템 수정
function  updateItem(itemId, itemTitle){
    return apiWithAuth.put(`/api/v1/items/${itemId}`, itemTitle, {
        headers: {
            'Content-Type': "text/plain"
        }
    })
}

// 아이템 삭제
function deleteItem(itemId){
    return apiWithAuth.delete(`/api/v1/items/${itemId}`)
}

// 아이템 DONE / UNDONE 체크하기
function changeItemDoneState(itemId) {
    return apiWithAuth.put(`/api/v1/items/${itemId}/done`)
}

export {
    createItem,
    updateItem,
    deleteItem,
    changeItemDoneState
}