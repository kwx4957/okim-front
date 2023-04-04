<template>
  <div class="card bg-gray-300 p-1">
    <div class="card-body flex flex-row items-center gap-3 p-2" :id="'item-' + item.id" @click="clickItemCard">
      <input type="checkbox" class="checkbox checkbox-md" :checked="item.itemStatus === 'DONE'" @change="handleCheckboxChange()"/>
      <div class="card-title">
        <h1 class="text-sm font-bold"
        >{{ item.title || item.itemTitle }}</h1>
      </div>
      <button class="btn btn-circle btn-outline btn-error btn-sm ml-auto" @click="deleteItem">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import itemService from "@/services/task/itemService";

export default {
  name: "AppAddItemCard",
  props: ['item'],
  data(){
    return {
      itemId: 0,
      currentItem: {}
    }
  },
  setup() {
  },
  methods: {
    // 아이템 삭제
    async deleteItem() {
      const itemId = this.item.id || this.item.itemId

      // 1. 삭제요청
      await itemService.deleteItem(itemId)
          .then(response => {
            console.log(JSON.stringify(response.data))

            // 2. 스테이트에서 해당 item 삭제
            this.$emit('deleteItem', itemId)
          }).catch(error => {
            console.log(JSON.stringify(error.response.data))
          });
    },
    async handleCheckboxChange() {
      console.log(this.item)
      /**
       *   1. DONE/UNDONE API 요청
       *   2. 데이터 갱신
       */
      this.itemId = this.item.id || this.item.itemId

      // 1. DONE/UNDONE API 요청
      await itemService.changeItemState(this.itemId)
          .then(response => {

            // 2. 상태 갱신
            console.log(JSON.stringify(response.data))
            this.$emit('refreshItems')
          });
    },
  }
}
</script>

<style scoped>

</style>