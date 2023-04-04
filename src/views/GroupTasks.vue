<template>
  <div class="my-9" :id="this.group.groupId">
    <h1 class="text-center text-4xl font-bold"> {{ this.group.groupName }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 p-10">
      <div v-for="groupTask in groupTasks" :key="groupTask.id">
        <GroupTaskItem :groupTask="groupTask"/>
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
  setup() {
    console.log("setup()")
  },
  beforeCreate:function(){
    console.log("######## beforeCreate");
  },
  created:function(){
    console.log("######## created");
  },
  beforeMount:function(){
    console.log("######## beforeMount");
  },
  mounted:function(){
    console.log("######## mounted");
    this.fetchGroupTasks()
    //this.msg = "Complete mounted";
  },
  beforeUpdate:function(){
    console.log("######## beforeUpdate");
    // 관리되는 그룹 아이디 와 라우트 param 그룹 아이디가 다를 경우 데이터 업데이트
    if (this.groupId !== this.$route.params['groupId']) {
        this.fetchGroupTasks()
        this.groupId = this.$route.params['groupId']
    }
  }
  ,updated:function(){
    console.log("######## updated");
  }
  ,beforeDestory:function(){
    console.log("######## beforeDestory");
  }
  ,destoryed:function(){
    console.log("######## destoryed");
  },
  methods: {
    async fetchGroupTasks() {
      // 1. 모든 그룹의 tasks 요청
      console.log(`fetchGroupTasks : ${this.$route.params['groupId']}`)
      await getGroupTasks(this.$route.params['groupId'], 0, 10)
          .then(response => {
            // 2. 데이터 저장
            console.log(JSON.stringify(response.data.data.tasks))
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