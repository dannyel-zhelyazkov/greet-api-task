<script setup>
defineProps({
  label: String,
  width: Number,
  height: Number,
});
</script>

<template>
  <div class="app-spinner">
    <span
      class="loader"
      :style="{ width: `${width}px`, height: `${height}px` }"
    />
    <span class="spinner-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.app-spinner {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.spinner-label {
  font-size: 36px;
  font-weight: 500;
}

.loader {
  border: 5px solid #fff;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin-bottom: var(--double-spacing);
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
