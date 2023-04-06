<template>
  <!-- main red card(case1. 하나의 테스크 가운데 할일을 절반도 못한 경우) -->
  <div class="card bg-base-200 shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-neutral-200 border">
    <div class="card-body" :id="'task-' + groupTask.taskId" @click="handleClickTask">
      <div class="flex flex-col justify-center items-center">
        <img :src="groupTask.userInfo.profileImgUrl" alt="user_profile" class="h-12 w-12 rounded-full border"
             :id="'user-' + groupTask.userInfo.userId" @click="handlerClickUserProfile">

        <h1 class="card-title">{{ groupTask.userInfo.nickname }}</h1>
        <div class="radial-progress my-5" :class="[radialProgressClass]" :style="{ '--value': radialProgressValue }">{{ groupTask.itemCompletedCount }} / {{ groupTask.itemTotalCount }}</div>

        <!-- 메인아이템 할일 제목 -->
        <p class="italic">{{ groupTask.mainItem.itemTitle }}</p>
      </div>

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
    (`그룹테스트 마운트 : ${JSON.stringify(this.groupTask)}`)
  },
  computed: {
    radialProgressClass() {
      const ratio = this.groupTask.itemCompletedCount / this.groupTask.itemTotalCount;
      if (ratio === 1) {
        return 'text-green-600';
      } else if (ratio >= 0.5) {
        return 'text-yellow-600';
      } else {
        return 'text-red-600';
      }
    },
    radialProgressValue() {
      return `${(this.groupTask.itemCompletedCount / this.groupTask.itemTotalCount) * 100}`;
    }
  },
  methods: {
    // 날짜계산
    getRelativeTime(date) {
      return dayjs(date).fromNow()
    },

    // 테스크 상세보기 이동
    handleClickTask() {
      (`${this.groupTask.taskId} // ${this.groupTask.userInfo.userId}`)
      this.$router.push({
        name: 'userTaskItems',
        params: {userId: this.groupTask.userInfo.userId, taskId: this.groupTask.taskId,}
      });
    },

    // 사용자의 테스크 리스트 페이지 이동
    handlerClickUserProfile() {
      (`${this.groupTask.taskId} // ${this.groupTask.userInfo.userId}`)
      event.stopPropagation();
      this.$router.push({
        name: 'userTasks',
        params: {userId: this.groupTask.userInfo.userId}
      })
    },
  }
})
</script>
