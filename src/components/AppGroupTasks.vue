<template>

    <!-- 간단 설명 -->
    <div class="description text-center text-3xl font-bold mb-10">최근 등록된 할일들 입니다.</div>

    <main>
      <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 p-10">

        <template v-for="task in tasks" :key="task.taskId">
          <GroupTaskItem :groupTask="task"></GroupTaskItem>
        </template>
      </div>
    </main>     
</template>

<script>
import taskService from "@/services/task/TaskService";
import GroupTaskItem from "@/components/GroupTaskItem";

export default {
    name: 'AppGroupTasks',
    components: {
      GroupTaskItem
    },
  data() {
    return {
      tasks: []
    };
  },
  async mounted() {
    await this.fetchRecentTasks();
  },
  methods: {
    async fetchRecentTasks() {
      await taskService.getRecentTasks()
          .then(response => {
            (JSON.stringify(response.data))
            this.tasks = response.data.data.tasks;
          }).catch(error => {
            console.log(JSON.stringify(error.data))
          });
    },
  }
}
</script>