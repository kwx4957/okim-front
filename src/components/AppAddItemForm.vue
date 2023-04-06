<template>
  <div class="items-center w-full bg-base-200 p-3">
    <!-- input form contents -->
    <form v-on:submit.prevent="addItem">
      <div class="form-control w-full max-w-xs mx-auto ">
        <input
            type="text" placeholder="할일을 작성하세요" class="input w-full max-w-xs mb-12 mt-5 rounded-lg"
            v-model="formItemTitle"
        />
        <button class="btn bg-gray-200 border-0 shadow-lg rounded-lg font-bold text-lg"
                :class="{ 'opacity-50 cursor-not-allowed': !formItemTitle }"
                :disabled="!formItemTitle">
          작성하기
        </button>

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

      (JSON.stringify(item))

      // 2. 테스크에 아이템 추가 요청 보내기
      const response = await itemService.addItem(item)

      // 3. 서버로부터 받은 새로운 todo를 todo 목록의 맨 앞에 추가
      this.addItem(response.data.data);

      // 4.입력 필드 초기화
      this.formItemTitle = ''
    },
    async addItem() {
      this.taskId = this.$route.params.taskId
      const item = {
        taskId: this.taskId,
        title: this.formItemTitle
      }

      itemService.addItem(item).then(response => {
        (JSON.stringify(response.data.data))
        this.$emit("refreshItem")
        this.formItemTitle = ''
      }).catch(error => {
        console.log(JSON.stringify(error.data))
      })
    }
  }
}
</script>

<style scoped>

</style>