<template>
  <div class="flex-1 overflow-y-auto">

    <div class="flex flex-col h-full">

      <!-- 아이템 리스트 -->
      <div class="flex-1 flex-col bg-base-200 rounded-xl w-full mx-auto overflow-y-auto" id="item-list-section">
        <div class="flex flex-col gap-4 overflow-y-auto bg-fixed flex-grow p-3">
          <template v-for="item in task.items" :key="item.itemId">
            {{ item }}
            <AppAddItemCard :item="item" @deleteItem="deleteItem" @refreshItems="fetchItems"/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppAddItemCard from "@/components/AppAddItemCard";
import taskService from "@/services/task/TaskService";


export default {
  name: "UserItems",
  components: {
    AppAddItemCard
  },
  data() {
    return {
      task: {}
    }
  },
  mounted() {

    console.log(this.$route)

    // 1. 테스크 번호로 아이템 호출
    taskService.getAllItemsByTaskId(this.$route.params.taskId)
        .then(response => {

           //  2. 데이터 저장
            console.log(JSON.stringify(response.data))
            this.task = response.data.data;
        }).catch(error => {
      console.log(JSON.stringify(error.data))
    });


  }
}
</script>

<style scoped>

</style>