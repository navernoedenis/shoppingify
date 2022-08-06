import { FC, memo } from "react";
import { useStyles } from "./styles";

import CustomButton from "components/custom-button";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ReactComponent as WineBottleIcon } from "assets/icons/wine-bottle.svg";

interface AddItemCardProps {
  onAddItem: () => void;
}

const AddItemCard: FC<AddItemCardProps> = ({ onAddItem }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <WineBottleIcon className={classes.icon} />

      <Box>
        <Typography className={classes.title} variant="subtitle2">
          Didn’t find what you need?
        </Typography>
        <CustomButton
          onClick={onAddItem}
          theme="tertiary"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          Add Item
        </CustomButton>
      </Box>
    </Box>
  );
};

AddItemCard.displayName = "AddItemCard";

export default memo(AddItemCard);
