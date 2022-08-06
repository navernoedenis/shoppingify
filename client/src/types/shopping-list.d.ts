declare type ShoppingListStatus = "cancelled" | "completed";

declare interface ShoppingList {
  id: number;
  status: ShoppingListStatus;
  title: string;
  createdAt: Date;
  shoppingItems: ShoppingListItem[];
}

declare interface ShoppingListItem {
  id: number | null;
  quantity: number;
  product: Product;
}

declare interface ShoppingListMap {
  [category: string]: ShoppingListItem[];
}

declare interface ShoppingListCreate {
  title: string;
  shoppingList: ShoppingListItem[];
}

declare type ShoppingListUpdated = Omit<ShoppingList, "shoppingItems"> & {
  updatedAt: Date;
  userId: number;
};

declare interface ShoppingListHistory {
  [dateYearAndMonth: string]: ShoppingList[];
}

declare interface ShoppingListStatisticMap {
  [category: string]: ShoppingListStatisticItem[];
}

declare interface ShoppingListStatisticPercentage {
  id: number | string;
  name: string;
  percentage: number;
}

declare interface ShoppingListStatisticItem {
  id: number | string;
  name: string;
  quantity: number;
  createdAt: Date;
}
