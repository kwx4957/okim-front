import { apiWithAuth} from "@/api";

const itemService = {
    // 아이템 추가
    async addItem(data) {
        return apiWithAuth.post(`/api/v1/item`, data);
    },

    // 아이템 삭제
    async deleteItem(itemId){
        return apiWithAuth.delete(`/api/v1/items/${itemId}`);
    },

    // DONE,UNDONE 체크 요청
    async changeItemState(itemId) {
        return apiWithAuth.put(`/api/v1/items/${itemId}/done`);
    },
}

export default itemService;