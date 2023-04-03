<template>
  <div>
    <div class="flex flex-row m-10 p-10" id="item-section">

      <!-- item list section-->
      <div class="flex flex-col p-10 gap-4 w-3/5 bg-base-200 rounded-xl" id="item-list-section">
        <h1 class="text-2xl text-center font-bold">할 일</h1>
        <div class="flex flex-col gap-4 overflow-y-auto bg-fixed flex-grow p-3">
          <template v-for="item in this.$store.state.item.items" :key="item.itemId">
            <!--          <template v-if="item.itemStatus === 'UNDONE'">-->
            <AppAddItemCard :item="item" />
            <!--          </template>-->
          </template>
        </div>
        <div class="divider"></div>

        <h1 class="text-2xl text-center font-bold">완료</h1>
        <!-- item list done section -->
        <div class="flex flex-col gap-4 ">
          <!-- item [start]-->
          <template v-for="item in this.$store.state.item.items" :key="item.itemId">
            <template v-if="item.itemStatus === 'DONE'">
              <AppAddItemCard :item="item" />
            </template>
          </template>
        </div>
      </div>
      <div class="divider divider-horizontal"></div>

      <!-- item action section -->
      <AppAddItemForm/>
    </div>
  </div>

</template>

<script>
import {defineComponent} from 'vue'
import AppAddItemForm from "@/components/AppAddItemForm";
import AppAddItemCard from "@/components/AppAddItemCard";
import taskService from "@/services/task/TaskService";
import { mapActions, mapState } from "vuex";


export default defineComponent({
  name: 'EditTaskItem',
  components: {
    AppAddItemCard,
    AppAddItemForm
  },
  data(){
    return {
      items: [],
      taskId: 0
    }
  },
  computed: {
    ...mapState('item', ['items']),
    undoneItems() {
      return this.$store.state.items.filter(item => item.itemStatus === 'UNDONE')
    },
    doneItems: {
      get() {
        return this.$store.state.item.items.filter(it => it['itemStatus'] === 'DONE');
      },
      cache: false
    }
  },
  async mounted() {

    // 1. 페이지 렌더링
    // 2. 테스크 번호 가져오기
    this.taskId = this.$route.params.taskId;

    // 3. 아이템 조회
    const response = await taskService.getAllItemsByTaskId(this.taskId);
    const itemTotalCount = response.data.data.itemTotalCount;
    const items = response.data.data.items;

    // 4. 아이템 data 에 저장
    this.items = response.data.data.items;

    // 4. 아이템 STATE 에 저장
    if (itemTotalCount !== 0) {
      this.setItems(items);
    } else {
      this.initItems();
    }
  },
  methods: {
    ...mapActions(['item', ('setItems')]),
    ...mapActions(['item', ('initItems')])
  }
})
</script>
