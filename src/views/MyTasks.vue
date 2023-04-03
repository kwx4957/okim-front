<template>
  <div>
    <!-- description [start]-->
    <div class="description flex flex-col justify-center items-center gap-4">
      <!-- description.profile -->
      <img :src="userProfileLink" alt="user_profile" class="h-36 w-36 rounded-full border ">

      <!-- description.nickname -->
      <h1 class="text-3xl italic">
        {{ userNickname }}
      </h1>
      님의 할일들
    </div>
    <!-- description [end]-->


    <div class="main">
      <main>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
          <!-- main red card(case1. 하나의 테스크 가운데 할일을 절반도 못한 경우) -->

          <router-link v-for="item in tasks" :key="item.id" :to="{ name: 'editTask', params: { taskId: item.taskId }}" :id="`card-${item.id}`">
            <div class="card bg-base-200 shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-neutral-200 border rounded-lg">
              <div class="card-body">
<!--                <div class="rating">-->
<!--                  <input type="radio" name="rating-2" class="mask mask-star-2 bg-red-400" :checked="item.itemCompletedCount / item.itemTotalCount === 1" />-->
<!--                  <input type="radio" name="rating-2" class="mask mask-star-2 bg-red-400" :checked="item.itemCompletedCount / item.itemTotalCount === 2" />-->
<!--                  <input type="radio" name="rating-2" class="mask mask-star-2 bg-red-400" :checked="item.itemCompletedCount / item.itemTotalCount === 3" />-->
<!--                  <input type="radio" name="rating-2" class="mask mask-star-2 bg-red-400" :checked="item.itemCompletedCount / item.itemTotalCount === 4" />-->
<!--                  <input type="radio" name="rating-2" class="mask mask-star-2 bg-red-400" :checked="item.itemCompletedCount / item.itemTotalCount === 5" />-->
<!--                </div>-->
                <div class="badge badge-lg my-2 badge-error text-sm">
                  <span class="mr-2">{{ item.itemCompletedCount }}</span>/<span class="ml-2">{{ item.itemTotalCount }}</span>
                </div>
                <p class="italic my-5">{{ item.mainItem.itemTitle }}</p>
                <h4 class="text-xs text-gray-500 text-right">{{ item.taskCreatedDt }}</h4>
              </div>
            </div>
          </router-link>


        </div>
      </main>
    </div>
  </div>
  <ButtonCreateTask/>
</template>


<script>
import { defineComponent } from 'vue'
import ButtonCreateTask from "@/components/ButtonCreateTask";
import {userService} from "@/services/user/UserService";
import taskService from "@/services/task/TaskService";

export default defineComponent({
  name: `MyTasks`,
  data(){
    return {
      userNickname: '',
      userProfileLink: '',
      tasks: [],
    }
  },
  components: {
    ButtonCreateTask
  },
  computed: {
    starCount(item) {
      const ratio = item.itemCompletedCount / item.itemTotalCount;
      if (ratio <= 0.2) {
        return 1;
      } else if (ratio <= 0.4) {
        return 2;
      } else if (ratio <= 0.6) {
        return 3;
      } else if (ratio <= 0.8) {
        return 4;
      } else {
        return 5;
      }
    }
  },
  async mounted() {

    // 1. 유저 정보 조회
    const response = await userService.getProfileInfo(this.$store.userId || localStorage.getItem('userId'))
    this.userNickname = response.data.nickname;
    this.userProfileLink = response.data.profileImage;

    // 2. 유저 테스트 리스트 조회
    await this.getUserTasks();
  },
  methods: {
    async getUserTasks() {
      const response = await taskService.getAllUserTasks(localStorage.getItem('userId'));
      console.log(`${JSON.stringify(response.data.data.tasks)}`)
      this.tasks = response.data.data.tasks;
    }
  }
})
</script>
