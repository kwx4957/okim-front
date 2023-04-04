<template>
    <div v-if="isLoading" class="loading-overlay">
      <div class="flex flex-col">
        <div class="loading-message">{{ loadingMessage }}</div>
      </div>
    </div>
    <button class="fixed right-0 m-5 close-button font-bold text-4xl" @click="hideLoading">X</button>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      loadingMessage: ""
    };
  },
  methods: {
    showLoading(message) {
      this.isLoading = true;
      this.loadingMessage = message;
    },
    hideLoading() {
      this.isLoading = false;
      this.loadingMessage = "";
    }
  }
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-overlay .loading-message {
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  position: relative;
}

.loading-overlay .loading-message .close-button {
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
}
</style>