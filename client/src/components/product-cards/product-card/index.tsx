import { FC } from "react";
import { useStyles } from "./styles";

import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";

interface ProductCardProps {
  isAddingToShoppingListDisabled: boolean;
  onAddToShoppingList: (product: Product) => void;
  onSetPreviewProduct: (product: Product) => void;
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({
  isAddingToShoppingListDisabled,
  onAddToShoppingList,
  onSetPreviewProduct,
  product
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <Typography
        className={classes.title}
        onClick={() => onSetPreviewProduct(product)}
        variant="subtitle2"
      >
        {product.name}
      </Typography>
      <IconButton
        className={classes.button}
        disabled={isAddingToShoppingListDisabled}
        onClick={() => onAddToShoppingList(product)}
      >
        <AddIcon />
      </IconButton>
    </Card>
  );
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
