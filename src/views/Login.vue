<template>
  <div class="bg-base-200 text-gray-900 font-sans rounded-l">
    <div class="flex items-center h-screen w-full">
      <div class="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span class="block w-full text-xl uppercase font-bold mb-4">로그인</span>

        <form class="mb-4" v-on:submit.prevent="submitForm">
          <div class="mb-4 md:w-full">
            <label for="email" class="block text-xs mb-1">이메일</label>
            <input
                class="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                placeholder="이메일을 입력하세요"
                v-model="email"
            />
          </div>
          <div class="mb-6 md:w-full">
            <label for="password" class="block text-xs mb-1">비밀번호</label>
            <input
                class="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                placeholder="패스워드를 입력하세요"
                v-model="password"
            />
          </div>
          <button class="text-black bg-base-200 uppercase text-sm font-semibold px-4 py-2 rounded hover:bg-neutral-200 min-w-full" :disabled="!isEmailValid && email">
            <span class="spinner-border spinner-border-sm"></span>
            로그인
          </button>
        </form>

        <router-link to="/register">
          <a class="text-blue-700 text-center text-sm">계정이 없으신가요?</a>
        </router-link>
        <div v-if="logMessage" class="alert alert-warning shadow-lg mt-4 p-2 text-xs font-bold">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{{ logMessage }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import RequestLogin from "@/api/request/RequestLogin";
import { validateEmail } from "@/utils/validation";

export default defineComponent({
  name: `Login`,
  data() {
    return {
      email: '',
      password: '',
      logMessage: ''
    }
  },
  computed: {
    isEmailValid(){
      return validateEmail(this.email)
    }
  },
  methods: {
    async submitForm() {
      try{
        const loginRequest = RequestLogin.create(this.email, this.password);
        await this.$store.dispatch('LOGIN', loginRequest);
        this.$router.push({name: 'home'});
      } catch (e) {
        this.logMessage = e.response.data.message
      }finally {
        this.initForm();
      }
    },
    initForm() {
      this.email = '';
      this.password = '';
    }
  }
})
</script>