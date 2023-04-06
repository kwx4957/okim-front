<template>
  <div class="flex-1 overflow-y-auto">

    <div class="flex flex-col h-full">

      <!-- 아이템 리스트 -->
      <div class="flex-1 flex-col bg-base-200 rounded-xl w-full mx-auto overflow-y-auto" id="item-list-section">
        <div class="flex flex-col gap-4 overflow-y-auto bg-fixed flex-grow p-3">
          <template v-for="item in task.items" :key="item.itemId">
<!--            <AppAddItemCard :item="item" @deleteItem="deleteItem" @refreshItems="fetchItems"/>-->
            <AppAddItemCard :item="item" @deleteItem="deleteItem" :isAuthor="isAuthor"/>
          </template>
        </div>
      </div>
      <!-- 작성하기 -->
      <AppAddItemForm v-show="isAuthor" @refreshItem="refreshItem"/>
    </div>
  </div>
</template>

<script>
import AppAddItemCard from "@/components/AppAddItemCard";
import taskService from "@/services/task/TaskService";
import AppAddItemForm from "@/components/AppAddItemForm";


export default {
  name: "UserItems",
  components: {
    AppAddItemCard,
    AppAddItemForm,
  },
  data() {
    return {
      task: {}
    }
  },
  computed:{
    currentUserId() {
      return localStorage.getItem('userId');
    },
    routeUserId() {
      return this.$route.params.userId;
    },
    isAuthor() {
      // 처음 테스크를 생성하는 경우
      if (this.$route.name === 'taskCreate') {
        return true
      }
      return this.currentUserId === this.routeUserId;
    }
  },
  mounted() {
    this.fetchTaskItems();
  },
  methods: {

    // 1. 모든 아이템들 가져오기
    fetchTaskItems() {
      taskService.getAllItemsByTaskId(this.$route.params.taskId)
          .then(response => {

            //  2. 데이터 저장
            console.log(JSON.stringify(response.data))
            this.task = response.data.data;
          }).catch(error => {
        console.log(JSON.stringify(error.data))
      });
    },
    refreshItem() {
        this.fetchTaskItems();
    },

    deleteItem(itemId) {
      console.log(`받음 : ${itemId}`)
      this.task.items = this.task.items.filter(item => item.itemId !== itemId)
    }
  }
}
</script>

<style scoped>

</style>