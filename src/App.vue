<script setup>
import { onMounted, ref } from 'vue';
import { greetService } from '@/services';
import { getCategoriesFromGreets, parseGreetToDisplayData } from '@/utils';
import GreetCardsContainer from '@/components/GreetCardsContainer.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import { defaultCategoryFilterOption, orderByOptions } from '@/common';

const state = ref({
  isLoading: false,
  greets: [],
  categories: [defaultCategoryFilterOption],
  orderBy: orderByOptions[0].value,
  filter: defaultCategoryFilterOption.value,
});

onMounted(async () => {
  state.value.isLoading = true;
  const [orderBy, orderType] = state.value.orderBy.split('-');
  const { data } = await greetService().getGreets(1, orderBy, orderType);

  if (data?.length) {
    state.value.greets = data.map(parseGreetToDisplayData);
    state.value.isLoading = false;
  }
});

const categoriesChange = (greets) => {
  state.value.categories = getCategoriesFromGreets(
    greets,
    state.value.categories
  );
};
const selectOrderBy = (event) => (state.value.orderBy = event.target.value);
const selectFilter = (event) => (state.value.filter = event.target.value);
</script>

<template>
  <h1 class="page-title">Greets API Page</h1>
  <div class="greets-page">
    <div class="filters">
      <app-dropdown
        class="order-by-dropdown"
        label="Order By"
        :on-change="selectOrderBy"
        :options="orderByOptions"
      />
      <app-dropdown
        class="categories-dropdown"
        label="Select by Category"
        :on-change="selectFilter"
        :options="state.categories"
      />
    </div>
    <greet-cards-container
      class="greets-container"
      :initial-loading="state.isLoading"
      :initial-greets="state.greets"
      :order-by="state.orderBy"
      :filter="state.filter"
      :change-categories="categoriesChange"
    />
  </div>
</template>

<style scoped>
.greets-page {
  display: flex;
}

.page-title {
  text-align: center;
  margin-bottom: var(--double-spacing);
  padding-bottom: var(--base-spacing);
  border-bottom: 1px solid black;
}

.filters {
  padding: 0 var(--double-spacing) 0 24px;
  border-right: 1px solid black;
  margin-right: 48px;
}

.order-by-dropdown {
  margin-bottom: var(--double-spacing);
}

@media (max-width: 800px) {
  .greets-page {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .filters {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: none;
    margin: 0 0 var(--double-spacing) 0;
    padding: 0;
  }

  .order-by-dropdown {
    display: flex;
    align-items: center;
    margin-bottom: var(--base-spacing);
  }

  .categories-dropdown {
    display: flex;
    align-items: center;
  }
}
</style>
