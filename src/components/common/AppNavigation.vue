<template>
  <header>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <!-- nav.logo -->
        <router-link to="/">
          <div class="btn btn-ghost normal-case text-xl rounded rounded-xs">할일 공유 v 1.1</div>
        </router-link>


        <!-- navigation.menu [start] -->
        <ul class="menu menu-horizontal menu-compact">
          <!-- tabindex will make the parent menu focusable to keep the submenu open if it's focused -->
          <li tabindex="0">
            <span>그룹</span>
            <ul class="bg-base-100">
              <!-- TODO group 클릭 시 어떻게 로직 짤지?-->
              <li v-for="group in groups" :key="group.organizationId" :id="'group-menu-' + group.organizationId">
                <h1 @click="handleClickGroupMenu(group.organizationId)">{{ group.organizationName }}</h1>
              </li>
              <li>
                <h1 class="font-bold text-base-500">
                  <router-link :to="{ name: 'groupList'}">그룹 현황 보기</router-link>
                </h1>
              </li>
            </ul>
          </li>
        </ul>
        <!-- navigation.menu [end] -->
      </div>

      <div class="flex-none">
        <div class="dropdown dropdown-end dropdown-hover">
          <!-- navigation.profile.dropboxdown-rabel -->
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img :src="this.$store.getters.userProfileLink" alt="프로필 이미지">
            </div>
          </label>


          <!-- navigation.profile.dropboxdown-content [start] -->
          <ul
              tabindex="0"
              class="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <template v-if="!isLoggedIn">
                <router-link :to="{ name: 'register' }">회원가입</router-link>
                <router-link :to="{ name: 'login' }">로그인</router-link>
              </template>
              <template v-else>
                <router-link :to="{ name: 'profile' }">프로필 보기</router-link>
                <router-link :to="{ name: 'myTasks'}">나의 할일 보기</router-link>
                <span @click="logout" class="text-red-400">로그아웃</span>
              </template>
            </li>
          </ul>
          <!-- navigation.profile.dropboxdown-content [end] -->
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters} from "vuex";
import {getGroups} from "@/api/group";

export default defineComponent({
  name: 'AppNavigation',
  computed: {
    ...mapGetters(['isLoggedIn', 'userNickname', 'userProfileLink']),
  },
  data() {
    return {
      groups: [],
    }
  },
  mounted() {
    this.getAllGroupName();
  },
  methods: {
    async handleClickGroupMenu(organizationId) {
      this.$router.push({name: 'groupsTask', params: { groupId: organizationId }});
    },

    // 모든 그룹 이름 가져오기
    async getAllGroupName() {
      // 1. 그룹 리스트 API 요청
      await getGroups()
          .then((response) => {
            // 2. 그룹 데이터 저장
            this.groups = response.data.data
          }).catch(error => {
            console.log(error.data)
          })
    },

    logout() {
      this.$store.dispatch('LOGOUT');
      this.$router.push('/');
    },
  }
})
</script>