<template >


  <div class="flex-1 overflow-y-auto">

    <div class="flex flex-col h-full">
      <!-- 아이템 리스트 -->
      <div class="flex-1 flex-col bg-base-200 rounded-xl w-full mx-auto overflow-y-auto" id="item-list-section">
        <div class="flex flex-col gap-4 overflow-y-auto bg-fixed flex-grow p-3">
<!--          <template v-for="item in this.$store.state.item.items" :key="item.itemId">-->
<!--            <AppAddItemCard :item="item" @deleteItem="deleteItem" @refreshItems="fetchItems"/>-->
<!--          </template>-->
          <template v-for="item in items" :key="item.itemId">
            {{ item }}
            <AppAddItemCard :item="item" @deleteItem="deleteItem" @refreshItems="fetchItems"/>
          </template>
        </div>
      </div>

      <!-- 작성하기 -->
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
    ...mapActions(['item', ('initItems')]),

    // 아이템 삭제
    deleteItem(itemId) {
      console.log(`아이템 아이디 받았음 : ${itemId}`)
      // this.$store.dispatch('deleteItem', itemId);

      // this.items = this.items.filter(item => item.itemId !== itemId);

      const indexToRemove = this.items.findIndex(item => item.itemId === itemId);
      if (indexToRemove !== -1) {
        this.items.splice(indexToRemove, 1);
      }
    },
    async fetchItems() {
      console.log("호출")
      const response = await taskService.getAllItemsByTaskId(this.taskId);
      const itemTotalCount = response.data.data.itemTotalCount;
      const items = response.data.data.items;
      this.items = response.data.data.items;
      if (itemTotalCount !== 0) {
        this.setItems(items);
      } else {
        this.initItems();
      }
    },
  }
})
</script>
