<template>


  <div class="flex-1 overflow-y-auto">
    <div class="flex flex-col h-full">



      <!-- item list section-->
      <div class="flex-1 flex-col bg-base-200 rounded-xl w-full mx-auto overflow-y-auto" id="item-list-section">
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
      <!--      <div class="divider divider-horizontal"></div>-->

      <!-- item action section -->

      <AppAddItemForm/>
    </div>
  </div>

  <!--  구성    -->
  <div>

<!--    <div class="flex flex-col justify-center mt-10" id="item-section">-->

<!--      &lt;!&ndash; item list section&ndash;&gt;-->
<!--      <div class="flex flex-col bg-base-200 rounded-xl w-full mx-auto" id="item-list-section">-->
<!--        <h1 class="text-2xl text-center font-bold">할 일</h1>-->
<!--        <div class="flex flex-col gap-4 overflow-y-auto bg-fixed flex-grow p-3">-->
<!--          <template v-for="item in this.$store.state.item.items" :key="item.itemId">-->
<!--            &lt;!&ndash;          <template v-if="item.itemStatus === 'UNDONE'">&ndash;&gt;-->
<!--            <AppAddItemCard :item="item" />-->
<!--            &lt;!&ndash;          </template>&ndash;&gt;-->
<!--          </template>-->
<!--        </div>-->
<!--        <div class="divider"></div>-->

<!--        <h1 class="text-2xl text-center font-bold">완료</h1>-->
<!--        &lt;!&ndash; item list done section &ndash;&gt;-->
<!--        <div class="flex flex-col gap-4 ">-->
<!--          &lt;!&ndash; item [start]&ndash;&gt;-->
<!--          <template v-for="item in this.$store.state.item.items" :key="item.itemId">-->
<!--            <template v-if="item.itemStatus === 'DONE'">-->
<!--              <AppAddItemCard :item="item" />-->
<!--            </template>-->
<!--          </template>-->
<!--        </div>-->

<!--      </div>-->
<!--&lt;!&ndash;      <div class="divider divider-horizontal"></div>&ndash;&gt;-->

<!--      &lt;!&ndash; item action section &ndash;&gt;>-->
<!--    </div>-->


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
