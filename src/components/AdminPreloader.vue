<template>
  <div v-if="loading" class="preloader-overlay">
    <div class="preloader-container">
      <div class="spinner">
        <div class="spinner-inner"></div>
      </div>
      <p class="preloader-text">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPreloader',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    message: {
      type: String,
      default: 'Loading...'
    }
  }
}
</script>

<style scoped>
.preloader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.preloader-container {
  text-align: center;
}

.spinner {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  position: relative;
}

.spinner-inner {
  width: 100%;
  height: 100%;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #6b8f71;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.preloader-text {
  color: #6b8f71;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}
</style>
