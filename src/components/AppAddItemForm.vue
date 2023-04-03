<template>
  <!--  <div class="w-2/5 flex justify-center flex-col items-center gap-4 p-3 bg-base-200 rounded-xl"-->
  <!--       id="item-action-section">-->
  <!--    <textarea-->
  <!--        placeholder="할일을 작성하세요"-->
  <!--        class="textarea textarea-bordered textarea-lg w-full max-w-xs"-->
  <!--        v-model="formItemTitle">-->
  <!--    </textarea>-->
  <!--    <button @click="addTodo" class="btn bg-base-200 border-0 shadow-lg">작성하기</button>-->
  <!--  </div>-->

  <div class="items-center w-full bg-base-200 p-3">
    <!-- input form contents -->
    <form v-on:submit.prevent="addTodo">
      <div class="form-control w-full max-w-xs mx-auto ">
        <label class="label">
          <span class="label-text text-md">할일을 작성하세요</span>
        </label>
        <input
            type="text" placeholder="할일을 작성하세요" class="input w-full max-w-xs mb-10 mt-5 rounded-lg"
            v-model="formItemTitle"
        />
        <button class="btn bg-current-300 border-0 shadow-lg rounded-lg">작성하기</button>
      </div>
    </form>
  </div>

</template>

<script>
import itemService from "@/services/task/itemService";
import {mapActions} from "vuex";

export default {
  name: "AppAddItemForm",
  data() {
    return {
      taskId: 0,
      formItemTitle: ''
    }
  },
  setup() {

  },
  methods: {
    ...mapActions(['item', ('addItem')]),

    async addTodo() {
      // 1. 현재 테스크 번호 가져오기
      this.taskId = this.$route.params.taskId

      const item = {
        taskId: this.taskId,
        title: this.formItemTitle
      }

      console.log(JSON.stringify(item))

      // 2. 테스크에 아이템 추가 요청 보내기
      const response = await itemService.addItem(item)

      // // 3. 서버로부터 받은 새로운 todo를 todo 목록의 맨 앞에 추가
      this.addItem(response.data.data);

      // 4.입력 필드 초기화
      this.formItemTitle = ''
    }
  }
}
</script>

<style scoped>

</style>