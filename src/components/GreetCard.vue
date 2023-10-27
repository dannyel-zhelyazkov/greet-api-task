<script setup xmlns="http://www.w3.org/1999/html">
const props = defineProps({
  name: String,
  image: Object,
  description: String,
  categories: Array,
  cartUrl: String,
});

const addToCard = () => (window.location.href = props.cartUrl);
</script>

<template>
  <div class="card">
    <div class="image-container">
      <img class="image" :src="image.src" :alt="image.alt" />
    </div>
    <div class="card-body">
      <div class="body-header">
        <h3 v-html="name" />
        <p class="card-description" v-html="description" />
      </div>
      <div class="body-footer">
        <div class="categories">
          <span class="category" v-for="category in categories.slice(0, 2)">
            {{ category.name }}
          </span>
        </div>
        <button @click="addToCard">Add to cart</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  min-width: var(--greet-card-width);
  min-height: var(--greet-card-height);
  background-color: var(--greet-card-background);
  color: white;
  border-radius: var(--border-radius);
  padding: var(--base-spacing);
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.body-footer {
  width: 100%;
}

.image-container {
  display: flex;
  justify-content: flex-start;
  min-width: var(--greet-card-image-width);
  border-radius: var(--border-radius);
  margin-right: var(--base-spacing);
}

.image {
  min-width: 100%;
  border-radius: var(--border-radius);
}

.categories {
  margin-bottom: var(--base-spacing);
}

.card-description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.category {
  border-radius: var(--border-radius);
  padding: 6px;
  background: #f45c05;
  font-weight: 500;
  margin-right: var(--base-spacing);
  font-size: 16px;
}

button {
  font-size: 16px;
  justify-self: flex-end;
  width: 100%;
  padding: var(--half-spacing);
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: var(--border-radius);
}

@media (max-width: 480px) {
  .card {
    min-width: 300px;
    max-height: fit-content;
    flex-direction: column;
    padding-top: 0;
  }

  .image-container {
    margin: var(--base-spacing) auto;
    max-height: 150px;
  }
}
</style>
