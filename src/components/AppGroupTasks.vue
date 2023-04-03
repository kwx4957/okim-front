<template>

    <!-- 간단 설명 -->
    <div class="description text-center text-3xl font-bold mb-10">사용자들이 등록한 할일 목표 현황입니다.</div>

    <main>
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10">

        <template v-for="(task, index) in tasks" :key="index">
          <GroupTaskItem :task="task"></GroupTaskItem>
        </template>
        <div ref="scroll" class="scroll-indicator"></div>


      </div>
    </main>     
</template>

<script>
import GroupTaskItem from './GroupTaskItem.vue'

export default {
    name: 'AppGroupTasks',
    components: {
        GroupTaskItem
    },
  data() {
    return {
      tasks: [],
      isEnd: false,
      page: 0,
      size: 10,
    };
  },
  async mounted() {
    // await this.$nextTick(); // 스크롤 요소가 렌더링될 때까지 기다립니다.
    // await this.loadMore();
    // window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    // async loadMore() {
    //   if (this.isEnd) return;
    //   try {
    //     const response = await api.get(`/api/v1/group/1/tasks?page=${this.page}&size=${this.size}`);
    //     this.tasks = this.tasks.concat(response.data.data.tasks);
    //     this.isEnd = response.data.isEnd;
    //     this.page += 1;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // onScroll() {
    //   const scrollElement = this.$refs.scroll;
    //   const scrollPosition = scrollElement.getBoundingClientRect().top + scrollElement.offsetHeight;
    //   const windowHeight = window.innerHeight;
    //   if (scrollPosition < windowHeight) {
    //     this.loadMore();
    //   }
    // },
  }
}
</script>


<style>
.scroll-indicator {
  height: 100px;
  width: 100%;
}
</style>