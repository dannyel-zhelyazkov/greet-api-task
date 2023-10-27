export const parseGreetToDisplayData = (rawGreet) => ({
  id: rawGreet.id,
  price: rawGreet.prices.price,
  image: { src: rawGreet.images[0].src, alt: rawGreet.images[0].alt },
  name: rawGreet.name,
  description: rawGreet.short_description.replace(/<p>|<\/p>/g, ''),
  categories: rawGreet.categories,
  cartUrl: import.meta.env.VITE_GREET_API_CART_URL,
});

export const checkIfCategoryShouldBeFiltered = (
  greetCategories,
  filterCategory
) => {
  if (filterCategory === 'all') return true;

  return !!greetCategories.find((gc) => gc.slug === filterCategory);
};

export const orderGreetsBy = (a, b, orderBy) => {
  let fnc;
  switch (orderBy) {
    case 'price-asc':
      fnc = a.price - b.price;
      break;
    case 'price-desc':
      fnc = b.price - a.price;
      break;
    case 'name-asc':
      fnc = a.name.localeCompare(b.name);
      break;
    case 'name-desc':
      fnc = b.name.localeCompare(a.name);
      break;
    default:
  }

  return fnc;
};

export const getCategoriesFromGreets = (greets, accumulator) =>
  greets.reduce((acc, greet) => {
    greet.categories.forEach((category) => {
      if (acc.find((ctg) => ctg.name === category.name)) return;

      acc.push({ value: category.slug, name: category.name });
    });

    return acc;
  }, accumulator);
