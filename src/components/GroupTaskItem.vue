<template>
    <!-- main red card(case1. 하나의 테스크 가운데 할일을 절반도 못한 경우) -->
        <div class="card bg-base-200 shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-neutral-200 border">
          <div class="card-body"> 
            <div class="flex justify-center">
                <img src="/public/img/curry.jpg" alt="user_profile" class="h-12 w-12 rounded-full border">
            </div> 
            <h1 class="card-title">너구리 님</h1>
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
          </div>
        </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'GroupTaskItem',
    setup() {
        
    },
})
</script>
