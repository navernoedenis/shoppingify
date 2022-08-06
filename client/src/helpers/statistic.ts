export function getCategoriesAndItemsStatistic(
  statistic: ShoppingListStatisticMap
) {
  const categoriesQuantities = Object.entries(statistic).reduce(
    (categoriesQuantities, [category, items]) => {
      if (!(category in categoriesQuantities)) {
        categoriesQuantities[category] = 0;
      }

      categoriesQuantities[category] += items.reduce(
        (amount, { quantity }) => amount + quantity,
        0
      );

      return categoriesQuantities;
    },
    {} as { [category: string]: number }
  );

  const totalQuantities = Object.values(categoriesQuantities).reduce(
    (totalQuantities, quantitity) => totalQuantities + quantitity
  );

  const categories: ShoppingListStatisticPercentage[] = Object.entries(
    categoriesQuantities
  ).map(([category, quantity]) => ({
    id: category,
    name: category,
    percentage: convertToPercentage(quantity, totalQuantities)
  }));

  const items = Object.values(statistic).reduce((itemsPercentages, items) => {
    const itemsWithPercentages = items.map((item) => ({
      id: item.id,
      name: item.name,
      percentage: convertToPercentage(item.quantity, totalQuantities)
    }));

    return itemsPercentages.concat(itemsWithPercentages);
  }, [] as ShoppingListStatisticPercentage[]);

  return {
    categories: sortByPercentage(categories),
    items: sortByPercentage(items)
  };
}

export function convertToPercentage(quantity: number, totalQuantities: number) {
  return +((quantity / totalQuantities) * 100).toFixed(2);
}

export function sortByPercentage<T extends { percentage: number }>(items: T[]) {
  return items.sort((current, next) => next.percentage - current.percentage);
}
