export interface ShoppingListState {
  error: string | null;
  hasUpdate: boolean;
  history: ShoppingList[];
  id: number | null;
  isCreated: boolean;
  isLoading: boolean;
  removeItemIds: number[];
  shoppingList: ShoppingListItem[];
  statistic: ShoppingListStatisticMap | null;
}

export interface ShoppingListClose {
  status: ShoppingListStatus;
  removeItemIds: number[];
}

export type ShoppingListStatisticMap = Record<
  "items" | "categories",
  ShoppingListStatisticPercentage[]
>;
