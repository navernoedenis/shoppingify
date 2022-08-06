export interface ProductsState {
  error: string | null;
  isLoading: boolean;
  preview: Product | null;
  products: Product[];
}
