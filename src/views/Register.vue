<template>
  <Popup :isLoading="isLoading" :loadingMessage="loadingMessage" />
  <div class="antialiased bg-base-200 text-gray-900 font-sans rounded-l">
    <div class="flex items-center h-screen w-full">
      <div class="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span class="block w-full text-xl uppercase font-bold mb-4">회원가입</span>
        <form class="mb-4" @submit.prevent="submitForm" action="/" method="post">
          <div class="mb-4 md:w-full">
            <label for="email" class="block text-xs mb-1">
              이메일
              <span class="ml-1 text-red-400">*</span>
              <span v-if="isPassEmailDuplicateMessage"
                    :class="isPassEmailDuplicate ? 'text-blue-400 ml-2': 'text-red-400 ml-2'">
                {{ isPassEmailDuplicateMessage }}
              </span>
            </label>
            <div class="flex items-center">
              <input
                  class="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  id="email"
                  v-model="email"
                  placeholder="이메일을 입력하세요"
              />
              <button
                  class="ml-2 text-black bg-base-200 uppercase text-sm font-semibold px-4 py-2 rounded hover:bg-neutral-200"
                  @click="checkDuplicateEmail"
                  type="button"
              >
                중복확인
              </button>
            </div>
          </div>
          <div class="mb-4 md:w-full">
            <label for="password" class="block text-xs mb-1">비밀번호
              <span class="ml-1 text-red-400">*</span>
              <span :class="isPassPasswordSize ? 'text-blue-400 ml-2' : 'text-red-400 ml-2'">
                {{ requirePasswordSizeMessage }}
          </span>
            </label>
            <div class="relative">
              <input
                  class="w-full border rounded p-2 outline-none focus:shadow-outline pr-12"
                  type="password"
                  name="password"
                  id="password"
                  v-model="password"
                  placeholder="패스워드를 입력하세요"/>
            </div>
          </div>
          <div class="mb-4 md:w-full">
            <label for="passwordConfirm" class="block text-xs mb-1">비밀번호 확인
              <span class="ml-1 text-red-400">*</span>
              <span :class="isPassPasswordConfirm ? 'text-blue-400 ml-2' : 'text-red-400 ml-2'">
                {{ passwordConfirmMessage }}
              </span>
            </label>
            <input
                class="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="passwordConfir"
                id="passwordConfirm"
                v-model="passwordConfirm"
                placeholder="패스워드를 한번 더 입력하세요"
            />
          </div>
          <div class="mb-4 md:w-full">
            <label for="nickname" class="block text-xs mb-1">닉네임
              <span class="ml-1 text-red-400">*</span>
              <span v-if="isPassNicknameDuplicateMessage"
                    :class="isPassNicknameDuplicate ? 'text-blue-400 ml-2' : 'text-red-400 ml-2'">
                {{ isPassNicknameDuplicateMessage }}
              </span>

            </label>
            <div class="flex items-center">
              <input
                  class="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="text"
                  name="nickname"
                  id="nickname"
                  v-model="nickname"
                  placeholder="닉네임을 입력하세요"
              />
              <button
                  class="ml-2 text-black bg-base-200 uppercase text-sm font-semibold px-4 py-2 rounded hover:bg-neutral-200"
                  @click="checkDuplicateNickname"
                  type="button">
                중복확인
              </button>
            </div>
          </div>
          <div class="mb-4 md:w-full">
            <label for="authNumber" class="block text-xs mb-1">인증번호
              <span class="ml-1 text-red-400">*</span>
              <span v-if="authCodeMessage"
                    :class="!isAuthCodeError ? 'text-blue-400 ml-2' : 'text-red-400 ml-2'">
                {{ authCodeMessage }}
              </span>
            </label>
            <div class="flex items-center">
              <input
                  class="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="text"
                  name="authNumber"
                  id="authNumber"
                  v-model="verificationCode"
                  placeholder="인증번호를 입력하세요"
              />
              <button
                  class="ml-2 text-black bg-base-200 uppercase text-sm font-semibold px-4 py-2 rounded hover:bg-neutral-200"
                  :disabled="isSendingVerificationCode"
                  @click="sendVerificationCodeToEmail"
                  type="button">
                {{ buttonLabel }}
              </button>
            </div>
          </div>
          <div class="mb-4 md:w-full">
            <label for="dropdown" class="block text-xs mb-1">소속 그룹
              <span class="ml-1 text-red-400">*</span>
            </label>
            <div class="relative">
              <select id="dropdown"
                      name="dropdown"
                      class="w-full border rounded p-2 outline-none focus:shadow-outline"
                      v-model="groupId"
              >
                <option v-for="group in groups" :key="group.id" :value="group.id">
                  {{ group.organizationName }}
                </option>
              </select>
            </div>

          </div>
          <button
              type="submit"
              class="w-full text-black bg-base-200 uppercase text-sm font-semibold px-4 py-2 rounded hover:bg-neutral-200">
            회원가입
          </button>
        </form>
        <router-link to="/login">
          <a class="text-blue-700 text-center text-sm">이미 계정이 있으신가요?</a>
        </router-link>

      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {userService} from "@/services/user/UserService";
import {validateEmail} from "@/utils/validation";
import {getGroupName} from "@/services/group/getGroupName";
import Popup from "@/components/Popup";

export default defineComponent({
  components:{
    Popup
  },
  data() {
    return {
      isLoading: false,
      loadingMessage: '',
      email: '',
      verifiedEmail: '',
      password: '',
      passwordConfirm: '',
      isPassPasswordConfirm: false,
      passwordConfirmMessage: '',
      nickname: '',
      verifiedNickname: '',
      authNumber: '',
      dropdown: '',
      isPassNicknameDuplicate: false,
      isPassNicknameDuplicateMessage: '',
      isPassEmailDuplicate: false,
      isPassEmailDuplicateMessage: '',
      isPassAuthCodeProcess: false,
      authCodeMessage: '',
      isAuthCodeError: false,
      verificationCode: '',
      isSendingVerificationCode: false,
      verificationCodeSent: false,
      groupId: 0,
      groups: [],
      requirePasswordSizeMessage: '',
      isPassPasswordSize: false
    }
  },
  watch: {
    passwordConfirm: function () {
      this.validatePasswordConfirm();
    },
    password: function (){
      this.validatePasswordSize();
    }
  },
  computed: {
    buttonLabel() {
      if (this.isSendingVerificationCode) {
        return "보내는 중";
      } else if (this.verificationCodeSent) {
        return "재전송";
      } else {
        return "인증번호 보내기";
      }
    }
  },
  created() {
    const groupName = getGroupName();
    groupName.then((groups) => {
      this.groups = groups
    })
  },
  methods: {
    // 회원가입
    async submitForm() {

      // 회원 가입 데이터 유효성 체크
      if(this.validationCheckFail()){
        return
      }

      // 회원가입 데이터
      const signUpRequest = {
        email: this.verifiedEmail,
        password: this.password,
        nickname: this.nickname,
        verificationCode: this.verificationCode,
        groupId: this.groupId
      }

      // 회원가입 요청
      await userService.singup(signUpRequest)
          .then(() => {
                alert("성공적으로 가입을 완료하였습니다.")
                this.$router.push({name: 'login'});
              }
          ).catch((error) =>{
            alert(error.response.data.message);
          })
    },

    // 닉네임 중복체크
    async checkDuplicateNickname() {
      const response = await userService.checkNicknameDuplicate(this.nickname);
      if (!response.data) {
        this.isPassNicknameDuplicate = true;
        this.isPassNicknameDuplicateMessage = "사용 가능한 닉네임입니다.";
        this.verifiedNickname = this.nickname;
      } else {
        this.isPassNicknameDuplicate = false;
        this.isPassNicknameDuplicateMessage = "사용 중인 닉네임입니다.";
      }
    },

    // 이메일 중복체크
    async checkDuplicateEmail() {
      if (!validateEmail(this.email)) {
        this.isPassEmailDuplicateMessage = "이메일을 입력바랍니다.";
        return;
      }

      const response = await userService.checkEmailDuplicate(this.email);
      if (!response.data) {
        this.isPassEmailDuplicate = true;
        this.isPassEmailDuplicateMessage = "사용 가능한 이메일입니다.";
        this.verifiedEmail = this.email;
      } else {
        this.isPassEmailDuplicate = false;
        this.isPassEmailDuplicateMessage = "이미 사용중인 이메일입니다.";
      }
    },

    // 인증코드 메일로 보내기
    async sendVerificationCodeToEmail() {

      // 1. 메일 중복 체크
      if (!this.isPassEmailDuplicate) {
        this.authCodeMessage = "이메일 중복검사 필수"
        return
      }

      this.isSendingVerificationCode = true;

      // 2. 인증코드 메일로 전송
      await userService.sendVerificationCode(this.email)
          .then(() => {
            this.authCodeMessage = "메일로 인증번호를 보냈습니다. 인증번호를 입력하세요"
            this.isAuthCodeError = false
          }).catch(error => {
            console.log(JSON.stringify(error.response))
            this.authCodeMessage = "인증메일 보내기에 실패하였습니다. 다시 시도 바랍니다."
            this.isAuthCodeError = true
          })

      this.isSendingVerificationCode = false;
      this.verificationCodeSent = true;

    },
    // 8자 이상 20자미만
    validatePasswordSize() {
      if (this.password.length >= 8 && this.password.length <= 20) {
        this.isPassPasswordSize = true
        this.requirePasswordSizeMessage = ''
      }else{
        this.isPassPasswordSize = false
        this.requirePasswordSizeMessage = "비밀번호는 8자 이상 20자 미만 이어야합니다."
      }
    },

    // 비밀번호 확인 체크
    validatePasswordConfirm() {

      if (this.passwordConfirm !== '') {
        if (this.password === this.passwordConfirm) {
          this.isPassPasswordConfirm = true;
          this.passwordConfirmMessage = "비밀번호가 일치합니다.";
        } else {
          this.isPassPasswordConfirm = false;
          this.passwordConfirmMessage = "비밀번호가 일치하지 않습니다.";
        }
      } else {
        this.isPassPasswordConfirm = false;
        this.passwordConfirmMessage = "비밀번호를 한번 더 입력하세요";
      }
    },

    // 회원 가입 전 최종 유효성 체크
    validationCheckFail() {
      return !this.isPassPasswordSize || !this.isPassPasswordConfirm || !this.isPassEmailDuplicate || !this.isPassNicknameDuplicate;
    },

    showLoading(message) {
      this.isLoading = true;
      this.loadingMessage = message;
    },
    hideLoading() {
      this.isLoading = false;
      this.loadingMessage = "";
    }
  }
})
</script>