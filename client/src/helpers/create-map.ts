import { getDayMonthAndYear, getMonthName } from "./date";

export function createProductsMap(products: Product[]) {
  if (!products.length) return null;

  const productsMap = products.reduce<{ [category: string]: Product[] }>(
    (categoriesMap, product) => {
      if (!(product.category in categoriesMap)) {
        categoriesMap[product.category] = [];
      }

      categoriesMap[product.category].push(product);
      return categoriesMap;
    },
    {}
  );

  return productsMap;
}

export function createShoppingListMap(shoppingList: ShoppingListItem[]) {
  if (!shoppingList.length) return null;

  const shoppingListMap = shoppingList.reduce<ShoppingListMap>(
    (categoriesMap, item) => {
      if (!(item.product.category in categoriesMap)) {
        categoriesMap[item.product.category] = [];
      }

      categoriesMap[item.product.category].push(item);
      return categoriesMap;
    },
    {}
  );

  return shoppingListMap;
}

export function createShoppingListHistoryMap(history: ShoppingList[]) {
  if (!history.length) return null;

  const shoppingListHistoryMap = history.reduce<ShoppingListHistory>(
    (historyMap, shoppingList) => {
      const { year, month } = getDayMonthAndYear(shoppingList.createdAt);
      const title = `${year}-${month}`;

      if (!historyMap[title]) {
        historyMap[title] = [];
      }

      historyMap[title].push(shoppingList);
      return historyMap;
    },
    {}
  );

  return shoppingListHistoryMap;
}

export function createShoppingListMonthlySummaryMap(history: ShoppingList[]) {
  if (!history.length) return null;

  const monthlySummary = history.reduceRight((summary, shoppingList) => {
    const { status, shoppingItems, createdAt } = shoppingList;

    if (status === "cancelled") return summary;
    const commonQuantity = shoppingItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const { year, month } = getDayMonthAndYear(createdAt);

    const dateTitle = `${year}.${month + 1}.1`;
    const yearAndMonthTitle = `${year} ${getMonthName(createdAt)}`;

    const monthSummaryIndex = summary.findIndex(
      (month) => month.dateTitle === dateTitle
    );

    if (monthSummaryIndex === -1) {
      summary.push({
        dateTitle,
        yearAndMonthTitle,
        quantity: commonQuantity
      });
    } else {
      summary[monthSummaryIndex].quantity += commonQuantity;
    }

    return summary;
  }, [] as { dateTitle: string; yearAndMonthTitle: string; quantity: number }[]);

  return monthlySummary;
}
