<script setup>
defineProps({
  label: String,
  onChange: Function,
  options: Array,
});
</script>

<template>
  <div class="dropdown-container">
    <span class="dropdown-label">{{ label }}</span>
    <div class="app-dropdown">
      <select id="dropdown" @change="onChange">
        <option v-for="option in options" :value="option.value">
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.dropdown-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.dropdown-label {
  margin-bottom: var(--half-spacing);
}

.app-dropdown {
  display: grid;
  width: 200px;
  grid-template-areas: 'select';
  align-items: center;
  position: relative;
  border: 1px solid var(--select-border);
  border-radius: 4px;
  padding: 4px var(--half-spacing);
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
}

.app-dropdown::after {
  grid-area: select;
  content: '';
  justify-self: end;
  width: 0.8em;
  height: 0.5em;
  background-color: var(--select-arrow);
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
}
</style>
