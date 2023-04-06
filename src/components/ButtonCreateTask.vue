<template>
  <!-- stick button with create TODO  -->
  <div class="fixed bottom-6 right-6 p-4">
    <div class="tooltip" data-tip="할일을 등록하세요!">
      <button class="btn btn-circle btn-outline w-24 h-24 bg-neutral-300 border-0" @click="createTemporaryTask">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 64 64" stroke-width="4"
             stroke="currentColor" fill="none">
          <path d="M55.5,23.9V53.5a2,2,0,0,1-2,2h-43a2,2,0,0,1-2-2v-43a2,2,0,0,1,2-2H41.64"/>
          <path
              d="M19.48,38.77l-.64,5.59a.84.84,0,0,0,.92.93l5.56-.64a.87.87,0,0,0,.5-.24L54.9,15.22a1.66,1.66,0,0,0,0-2.35L51.15,9.1a1.67,1.67,0,0,0-2.36,0L19.71,38.28A.83.83,0,0,0,19.48,38.77Z"/>
          <line x1="44.87" y1="13.04" x2="50.9" y2="19.24"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import taskService from "@/services/task/TaskService";
import {mapActions} from 'vuex'

export default defineComponent({
  name: 'ButtonCreateTask',
  setup() {

  },
  methods: {
    /**
     * 0. 권한이 없을 경우에는 불가능
     * 1. state & localstorage 에서 임시 저장된 tempTaskId 가 있는 지 확인
     * 2. 없을 경우 테스크 생성 요청(있을 경우 가져온 tempTaskId 활용)
     * 3. 생성된 테스크 번호 state, localstorage 에 저장
     * 4. 할일 생성 페이지 이동
     */
    async createTemporaryTask() {
      // 로그인 하지 않을 경우 로그인 페이지로 이동
      if (localStorage.getItem('currentUser') == null) {
        alert("로그인 후 사용할 수 있습니다")
        this.$router.push({ name: 'login'})
        return
      }

      // 1. 임시 테스크 생성 요청
      const response = await taskService.createAdhocTask()
          .catch(error => {console.log(error.data)});

      // 2. 페이지 이동
      this.$router.push({name: 'taskCreate', params: {taskId: response.data.data.taskId}});
    }

  }

})
</script>
