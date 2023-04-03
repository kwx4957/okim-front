<template>
  <div>
    <!-- description [start]-->
    <div class="description flex flex-col justify-center items-center gap-4">
      <!-- description.profile -->
      <img :src="profileImageLink" alt="user_profile" class="h-36 w-36 rounded-full border ">

      <!-- description.nickname -->
      <h1 class="text-3xl italic"></h1>
      님의 할일들
    </div>
    <!-- description [end]-->


    <div class="main">
      <main>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
          <!-- main red card(case1. 하나의 테스크 가운데 할일을 절반도 못한 경우) -->
          <div class="card bg-base-200 shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-neutral-200 border rounded-lg">
            <div class="card-body">
              <div class="rating">
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-red-400" />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-red-400" checked/>
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-red-400" />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-red-400" />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-red-400" />
              </div>
              <div class="badge badge-lg my-2 badge-error text-sm">
                <span class="mr-2">4</span>/<span class="ml-2">10</span>
              </div>
              <p class="italic my-5">"쿠버네티스 학습하기"</p>
              <h4 class="text-xs text-gray-500 text-right">11분 전</h4>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
  <ButtonCreateTask/>
</template>


<script>
import { defineComponent } from 'vue'
import ButtonCreateTask from "@/components/ButtonCreateTask";

export default defineComponent({
  name: `Tasks`,
  components: {
    ButtonCreateTask
  },
  computed: {

  }
})
</script>
