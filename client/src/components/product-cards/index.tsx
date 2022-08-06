import { FC } from "react";
import { useStyles } from "./styles";

import ProductCard from "./product-card";
import CardGridLayout from "layouts/card-grid";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ProductCardsProps {
  isAddingToShoppingListDisabled: boolean;
  onAddToShoppingList: (product: Product) => void;
  onSetPreviewProduct: (product: Product) => void;
  products: Product[];
  title: string;
}

const ProductCards: FC<ProductCardsProps> = ({
  isAddingToShoppingListDisabled,
  onAddToShoppingList,
  onSetPreviewProduct,
  products,
  title
}) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography className={classes.title} variant="subtitle1">
        {title}
      </Typography>

      <CardGridLayout>
        {products.map((product) => (
          <ProductCard
            isAddingToShoppingListDisabled={isAddingToShoppingListDisabled}
            key={product.name}
            onAddToShoppingList={onAddToShoppingList}
            onSetPreviewProduct={onSetPreviewProduct}
            product={product}
          />
        ))}
      </CardGridLayout>
    </Box>
  );
};

ProductCards.displayName = "ProductCards";

export default ProductCards;
