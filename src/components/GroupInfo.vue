<template>
  <div class="card bg-base-200 shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-neutral-200 border "
       :id="'group-' + group.organizationId">
    <div class="card-body" @click="clickGroupCard()">
      <div class="flex justify-center flex-col items-center">
        <h1 class="card-title text-2xl">{{ group.organizationName }}</h1>
        <br/>
        <h1 class="text-1xl"> {{ group.memberCount }} 명 참여중</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupInfo",
  props: ["group"],
  methods: {
    async clickGroupCard() {
      this.$router.push({name: 'groupsTask', params: { groupId: this.group.organizationId }});
    }
  }

}
</script>

<style scoped>

</style>