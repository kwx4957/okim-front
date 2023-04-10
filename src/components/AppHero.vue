<template>
  <!-- hero -->
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">할일 공유 플랫폼<span class="text-xs">{{ appVersion }}</span></h1>
        <p class="py-6">
          "할일을 공유해보세요!" 웹사이트에서 효율적으로 일상적인 과제를 완수하세요. 다른 이들과 함께 공유하고 협력하여 문제를 해결할 수 있습니다.
        </p>

        <router-link v-if="isCurrentUserExist" :to="{ name: 'register'}">
          <button class="btn btn-primary">가입하러 가기</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
      name: 'AppHero',
      data() {
        return {
          isCurrentUserExist: false,
          appVersion: "",
        }
      },
      mounted() {
        this.appVersion = process.env.VUE_APP_VERSION;
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser === null) {
          this.isCurrentUserExist = true;
        }
      }
    }
)
</script>