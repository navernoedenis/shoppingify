import { FC, memo } from "react";
import { useStyles } from "./styles";

import CustomButton from "components/custom-button";
import BackButton from "components/back-button";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface ProductPreviewProps {
  isAddingToShoppingListDisabled: boolean;
  onAddToShoppingList: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onGoBack: () => void;
  product: Product;
}

const ProductPreview: FC<ProductPreviewProps> = ({
  isAddingToShoppingListDisabled,
  onAddToShoppingList,
  onDeleteProduct,
  onGoBack,
  product
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.buttonContainer}>
        <BackButton onClick={onGoBack} />
      </Box>

      <Box className={classes.product}>
        {product.image && (
          <Box
            className={classes.productImage}
            src={product.image}
            component="img"
            alt="image"
          />
        )}

        <Stack className={classes.productAbout} spacing="34px">
          <Box className={classes.productItem}>
            <Typography className={classes.productTitle} variant="body2">
              name
            </Typography>
            <Typography className={classes.productSubtitle} variant="h2">
              {product.name}
            </Typography>
          </Box>

          <Box className={classes.productItem}>
            <Typography className={classes.productTitle} variant="body2">
              category
            </Typography>
            <Typography className={classes.productSubtitle} variant="subtitle1">
              {product.category}
            </Typography>
          </Box>

          {product.note && (
            <Box className={classes.productItem}>
              <Typography className={classes.productTitle} variant="body2">
                note
              </Typography>
              <Typography variant="subtitle1">{product.note}</Typography>
            </Box>
          )}
        </Stack>
      </Box>

      <Stack
        className={classes.buttons}
        spacing="15px"
        direction="row"
        justifyContent="center"
      >
        <CustomButton onClick={() => onDeleteProduct(product)}>
          delete
        </CustomButton>
        <CustomButton
          disabled={isAddingToShoppingListDisabled}
          onClick={() => onAddToShoppingList(product)}
          theme="primary"
        >
          Add to list
        </CustomButton>
      </Stack>
    </Box>
  );
};

ProductPreview.displayName = "ProductPreview";

export default memo(ProductPreview);
