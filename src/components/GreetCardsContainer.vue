<script setup>
import GreetCard from '@/components/GreetCard.vue';
import {
  checkIfCategoryShouldBeFiltered,
  orderGreetsBy,
  parseGreetToDisplayData,
} from '@/utils';
import { computed, onMounted, ref, watch } from 'vue';
import { greetService } from '@/services';
import AppSpinner from '@/components/AppSpinner.vue';

const props = defineProps({
  initialGreets: Array,
  initialLoading: Boolean,
  orderBy: String,
  filter: String,
  changeCategories: Function,
});

const state = ref({ greets: [], page: 2, isLoading: false });

const computedGreets = computed(() => {
  if (props.orderBy === 'none' && props.filter === 'all')
    return state.value.greets;

  if (props.orderBy !== 'none' && props.filter === 'all')
    return [...state.value.greets].sort((a, b) =>
      orderGreetsBy(a, b, props.orderBy)
    );

  if (props.orderBy === 'none' && props.filter !== 'all')
    return state.value.greets.filter((g) =>
      checkIfCategoryShouldBeFiltered(g.categories, props.filter)
    );

  return [...state.value.greets]
    .filter((g) => checkIfCategoryShouldBeFiltered(g.categories, props.filter))
    .sort((a, b) => orderGreetsBy(a, b, props.orderBy));
});

onMounted(() => {
  const container = document.querySelector('#infinite-greets');

  container.addEventListener('scroll', async (e) => {
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
      if (state.value.isLoading) return;

      state.value.isLoading = true;
      const [orderBy, orderType] = props.orderBy.split('-');
      const { data, totalPages, totalRecords } = await greetService().getGreets(
        state.value.page,
        orderBy,
        orderType
      );

      if (data?.length) {
        state.value.page += 1;
        state.value.greets = [
          ...state.value.greets,
          ...data.map(parseGreetToDisplayData),
        ];
      }
      state.value.isLoading = false;
    }
  });
});

watch(
  () => props.initialGreets,
  (newGreets) => (state.value.greets = newGreets)
);

watch(
  () => state.value.greets,
  (value) => props.changeCategories(value)
);
</script>

<template>
  <div
    id="infinite-greets"
    :class="initialLoading ? 'loading-container' : 'greets-container'"
  >
    <app-spinner
      v-if="initialLoading"
      label="Loading Greets"
      :width="200"
      :height="200"
    />
    <greet-card
      class="greet-item"
      v-for="greet in computedGreets"
      :name="greet.name"
      :image="greet.image"
      :description="greet.description"
      :categories="greet.categories"
      :cartUrl="greet.cartUrl"
    />
    <app-spinner
      class="more-greets-loader"
      label="Loading More Greets"
      v-if="state.isLoading"
      :width="50"
      :height="50"
    />
  </div>
</template>

<style scoped>
.greets-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  height: calc(3 * (var(--greet-card-height) + var(--double-spacing)));
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.greet-item {
  flex-basis: 30%;
  height: var(--greet-card-height);
  -ms-flex: auto;
  margin: 0 var(--double-spacing) var(--double-spacing) 0;
}

.more-greets-loader {
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 1289px) {
  .greets-container {
    justify-content: center;
  }

  .loading-container {
    align-items: flex-start;
  }

  .greet-item:not(:last-child) {
    margin-right: 0;
  }
}
</style>
