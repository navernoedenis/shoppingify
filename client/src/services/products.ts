import client from "client";

export const httpGetProducts = async () => {
  return await client.get<{ products: Product[] }>("/api/products");
};

export const httpCreateProduct = async (product: Omit<Product, "id">) => {
  return await client.post<{ product: Product }>("api/products", { product });
};

export const httpDeleteProduct = async (productId: number) => {
  return await client.delete<{ message: string }>(`api/products/${productId}`);
};
