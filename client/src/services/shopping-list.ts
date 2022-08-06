import client from "client";

export const httpCreateShoppingList = async ({
  title,
  shoppingList: shoppingListData
}: ShoppingListCreate) => {
  const shoppingList = shoppingListData.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity
  }));

  return await client.post<{ shoppingList: ShoppingList }>(
    "/api/shopping-list",
    { title, shoppingList }
  );
};

export const httpGetShoppingList = async () => {
  return await client.get<{ shoppingList: ShoppingList | null }>(
    "/api/shopping-list"
  );
};

export const httpGetShoppingListsHistory = async () => {
  return await client.get<{ shoppingLists: ShoppingList[] }>(
    "/api/shopping-list/closed"
  );
};

export const httpGetShoppingListStatistic = async () => {
  return await client.get<{ statistic: ShoppingListStatisticMap | null }>(
    "/api/shopping-list/statistics"
  );
};

export const httpRemoveShoppingListItems = async (ids: number[]) => {
  return await client.delete("/api/shopping-list/items", { data: { ids } });
};

export const httpCloseShoppingList = async (status: ShoppingListStatus) => {
  return await client.patch<{ shoppingList: ShoppingListUpdated }>(
    "/api/shopping-list",
    { status }
  );
};
