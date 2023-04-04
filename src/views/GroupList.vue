<template>

  <!-- 설명 -->
  <div class="my-9">
    <h1 class="text-center text-4xl font-bold">그룹 현황</h1>


    <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 p-10">
      <div v-for="group in groups" :key="group.organizationId">
        <GroupInfo :group="group"/>
      </div>
    </div>

  </div>
  <!-- 설명 -->

</template>

<script>
import GroupInfo from "@/components/GroupInfo";
import {getGroups} from "@/api/group";

export default {
  name: "GroupList",
  components: {
    GroupInfo
  },
  data() {
    return {
      groups: []
    }
  },
  mounted() {
    // 그룹 현황 API 조회
    getGroups()
        .then(response => {
          console.log(JSON.stringify(response.data));
          console.log(JSON.stringify(response.data.data));
          this.groups = [];
          this.groups = response.data.data;

          // 2. 데이터 저장
        }).catch(error => {
          console.log(JSON.stringify(error));
        })
  },
  methods: {
    getAllGroups() {
      // 1. 그룹 api 조회
      getGroups()
          .then(response => {
            console.log(JSON.stringify(response.data))

            // 2. 데이터 저장
          }).catch(error => {
        console.log(JSON.stringify(error.data))
      })
    },
  }
}
</script>

<style scoped>

</style>