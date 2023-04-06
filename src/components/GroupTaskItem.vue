<template>
  <!-- main red card(case1. 하나의 테스크 가운데 할일을 절반도 못한 경우) -->
  <div class="card bg-base-200 shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-neutral-200 border">
    <div class="card-body" :id="'task-' + groupTask.taskId" @click="handleClickTask">
      <div class="flex justify-center">
        <img :src="groupTask.userInfo.profileImgUrl" alt="user_profile" class="h-12 w-12 rounded-full border"
             :id="'user-' + groupTask.userInfo.userId" @click="handlerClickUserProfile">
      </div>
      <h1 class="card-title">{{ groupTask.userInfo.nickname }}</h1>
      <div class="badge badge-lg my-2 badge-error text-sm">
        <span class="mr-2">{{ groupTask.itemCompletedCount }}</span>/<span class="ml-2">{{
          groupTask.itemTotalCount
        }}</span>
      </div>

      <!-- 메인아이템 할일 제목 -->
      <p class="italic">{{ groupTask.mainItem.itemTitle }}</p>
      <h4 class="text-xs text-gray-500 text-right">{{ getRelativeTime(groupTask.taskUpdatedDt) }}</h4>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default defineComponent({
  name: 'GroupTaskItem',
  props: ['groupTask'],
  setup() {

  },
  mounted() {
    console.log(`그룹테스트 마운트 : ${JSON.stringify(this.groupTask)}`)
  },
  methods: {
    // 날짜계산
    getRelativeTime(date) {
      return dayjs(date).fromNow()
    },

    // 테스크 상세보기 이동
    handleClickTask() {
      console.log(`${this.groupTask.taskId} // ${this.groupTask.userInfo.userId}`)
      this.$router.push({
        name: 'userTaskItems',
        params: {userId: this.groupTask.userInfo.userId, taskId: this.groupTask.taskId,}
      });
    },

    // 사용자의 테스크 리스트 페이지 이동
    handlerClickUserProfile() {
      console.log(`${this.groupTask.taskId} // ${this.groupTask.userInfo.userId}`)
      event.stopPropagation();
      this.$router.push({
        name: 'userTasks',
        params: {userId: this.groupTask.userInfo.userId}
      })
    },
  }
})
</script>
