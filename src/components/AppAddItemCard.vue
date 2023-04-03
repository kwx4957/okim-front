<template>
  <div class="card bg-blue-200">
    <div class="card-body flex flex-row items-center gap-4 p-5" :id="'item-' + item.id" @click="clickItemCard">
      <input type="checkbox" class="checkbox checkbox-md" :checked="item.itemStatus === 'DONE'"/>
      <div class="card-title">
        <h1 class="text-lg" >{{ item.title || item.itemTitle }}</h1>
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
    deleteItem() {
      this.$emit('delete-item', this.item.itemId);
    },
    clickItemCard() {
      // 아이템 선택
      this.$store.dispatch('setCurrentTime',
          {
            title: this.item.itemTitle || this.item.title,
            id: this.item.id || this.item.itemId
          }
      )
    },
  }
}
</script>

<style scoped>

</style>