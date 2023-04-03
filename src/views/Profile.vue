<template>
    <div class="antialiased bg-base-200 text-gray-900 font-sans rounded-l">
  <div class="flex items-center h-screen w-full">
    <div class="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
      <span class="block w-full text-xl uppercase font-bold mb-4">프로필 수정</span>
      <form class="mb-4" @submit.prevent="submitEditData" action="/" method="post">
        <div class="mb-4 md:w-full flex justify-center">

            <label for="profile-picture-input" class="btn btn-ghost btn-circle avatar" title="hello">
                <div class="w-fit h-fit rounded-full">
                  <img id="profile-picture" :src="profileImageUrl" />
                </div>
            </label>
            <input type="file" ref="fileInput" id="profile-picture-input" accept="image/*" style="display:none" @change="previewProfileImage">

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
              placeholder="닉네임을 입력하세요"
              v-model="nickname"
            />
            <button
              id="nickname-check"
              type="button"
              class="ml-2 text-black bg-base-200 uppercase text-sm font-semibold px-4 py-2 rounded hover:bg-neutral-200"
              @click="checkDuplicateNickname"
            >
              중복확인
            </button>
          </div>
        </div>
        <div class="mb-4 md:w-full">
          <label for="github-id" class="block text-xs mb-1">깃헙 아이디</label>
          <input
            class="w-full border rounded p-2 outline-none focus:shadow-outline"
            type="text"
            name="github-id"
            id="github-id"
            placeholder="깃헙 아이디를 입력하세요"
            v-model="githubId"
          />
        </div>
        <div class="mb-4 md:w-full">
          <label for="group" class="block text-xs mb-1">소속 그룹</label>
          <div class="relative">
            <select
              id="group"
              name="group"
              class="w-full border rounded p-2 outline-none focus:shadow-outline"
            >
              <option value="1">쿠버네티스 10회차</option>
              <option value="2">쿠버네티스 11회차</option>
              <option value="3">쿠버네티스 12회차</option>
            </select>
          </div>
        </div>
        <div class="mb-4 md:w-full">
          <label for="intro" class="block text-xs mb-1"
            >자기소개</label>
          <textarea
            class="w-full border rounded p-2 outline-none focus:shadow-outline"
            name="intro"
            id="intro"
            rows="4"
            placeholder="자기소개를 입력하세요"
            v-model="selfDesc"
          ></textarea>
        </div>
        <button id="profile-submit"
          class="w-full text-black bg-base-200 uppercase text-sm font-semibold px-4 py-2 rounded hover:bg-neutral-200"
          @click="submitEditData">
          수정완료
        </button>
      </form>
    </div>
  </div>
</div>
  <ButtonCreateTask></ButtonCreateTask>
</template>

<script>
import { defineComponent } from 'vue';
import ButtonCreateTask from "@/components/ButtonCreateTask";
import {userService} from "@/services/user/UserService";

export default defineComponent({
    name: `Profile`,
    data(){
      return {
        nickname: '',
        githubId: '',
        groupId: '',
        selfDesc: '',
        profileImageUrl: '',
        isPassNicknameDuplicate: '' ,
        isPassNicknameDuplicateMessage: '',
        verifiedNickname: '',
      }
    },
    components:{
      ButtonCreateTask
    },
    async mounted() {

       // 1. 유저 프로필 조회
      const response = await userService.getProfileInfo(localStorage.getItem('userId'))
      console.log(JSON.stringify(response))

      // 2. 데이터 저장
      this.nickname = response.data.nickname;
      this.verifiedNickname = response.data.nickname;
      this.githubId = response.data.githubId;
      this.selfDesc = response.data.selfDesc;
      this.profileImageUrl = response.data.profileImage;
    },
    methods:{
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

      previewProfileImage(event) {
        console.log("Fdsfsd")
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.profileImageUrl = event.target.result;
        };
     },
      submitEditData() {
        const formData = new FormData();
        formData.append('nickname', this.nickname);
        formData.append('githubId', this.githubId);
        formData.append('selfDesc', this.selfDesc);
        if (this.$refs.fileInput.files[0] !== undefined) {
          formData.append('file', this.$refs.fileInput.files[0]);
        }


        const response = userService.updateProfile(localStorage.getItem('userId'), formData)
        console.log(JSON.stringify(response))


        // axios.post('/api/profile', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // })
        //     .then(response => {
        //       // handle successful response
        //     })
        //     .catch(error => {
        //       // handle error response
        //     });
      },
    }
})
</script>