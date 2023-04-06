<template>
  <div class="card bg-gray-300 p-1">
    <div class="card-body flex flex-row items-center gap-3 p-2" :id="'item-' + item.itemId" @click="clickItemCard">
      <input type="checkbox" class="checkbox checkbox-md" :checked="item.itemStatus === 'DONE'" :disabled="!isAuthor" @change="handleCheckboxChange()" />
      <div class="card-title">
        <h1 class="text-sm font-bold"
        >{{ item.itemTitle }}</h1>
      </div>
      <button class="btn btn-circle btn-outline btn-error btn-sm ml-auto" @click="deleteItem" v-if="isAuthor">
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
  props: ['item', 'isAuthor'],
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
      // const itemId = this.item.id || this.item.itemId

      // 1. 삭제요청
      await itemService.deleteItem(this.item.itemId)
          .then(response => {
            (JSON.stringify(response.data))

            // 2. props tasks 에서 해당 item 만 삭제
            this.$emit('deleteItem', this.item.itemId)
          }).catch(error => {
            console.log(JSON.stringify(error.response.data))
          });
    },
    async handleCheckboxChange() {
      // 1. DONE/UNDONE API 요청
      await itemService.changeItemState(this.item.itemId)
          .then(response => {

            // 2. 상태 갱신
            (JSON.stringify(response.data))
            this.$emit('refreshItems')
          });
    },
  }
}
</script>

<style scoped>

</style>