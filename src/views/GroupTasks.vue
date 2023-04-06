<template>
  <h1 class="text-center text-4xl font-bold py-10 bg-yellow-100"> {{ this.group.groupName }}</h1>

  <div class="flex-1 overflow-y-auto">

    <div class="flex flex-col h-full">


      <div class="flex-1 flex-col rounded-xl w-full mx-auto overflow-y-auto">


        <div class="my-1" :id="this.group.groupId">
          <template v-if="groupTasks.length == 0">
            <div class="flex flex-col items-center justify-center my-10 font-bold text-blue-500">
              해당 그룹에는 할일이 등록되지 않았습니다.
            </div>
          </template>
          <template v-else>
            <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 p-10">
              <div v-for="groupTask in groupTasks" :key="groupTask.id">
                <GroupTaskItem :groupTask="groupTask"/>
              </div>
            </div>
          </template>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
import GroupTaskItem from "@/components/GroupTaskItem";
import {getGroupTasks} from "@/api/group";

export default {
  name: "GroupTasks",
  components: {
    GroupTaskItem
  },
  data() {
    return {
      groupTasks: [],
      group: {},
      groupId: 0
    }
  },
  mounted:function(){
    this.fetchGroupTasks()
  },
  beforeUpdate:function(){
    // 관리되는 그룹 아이디 와 라우트 param 그룹 아이디가 다를 경우 데이터 업데이트
    if (this.groupId !== this.$route.params['groupId']) {
        this.fetchGroupTasks()
        this.groupId = this.$route.params['groupId']
    }
  },
  methods: {
    async fetchGroupTasks() {
      // 1. 모든 그룹의 tasks 요청
      console.log(`fetchGroupTasks : ${this.$route.params['groupId']}`)
      await getGroupTasks(this.$route.params['groupId'], 0, 1000)
          .then(response => {
            // 2. 데이터 저장
            this.groupTasks = response.data.data.tasks;
            this.group = response.data.data.groupInfo;
          })
          .catch(error => {
            console.log(error.data)
          })
    }
  }
}
</script>

<style scoped>

</style>