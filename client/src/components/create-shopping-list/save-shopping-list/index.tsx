import { FC, memo } from "react";
import { useStyles } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomButton from "components/custom-button";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

interface SaveShoppingListProps {
  isDisabled: boolean;
  onSaveShoppingList: (data: { title: string }) => void;
}

const schema = yup.object({
  title: yup.string().min(5).required()
});

const SaveShoppingList: FC<SaveShoppingListProps> = ({
  isDisabled,
  onSaveShoppingList
}) => {
  const classes = useStyles();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<{ title: string }>({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const title = getValues("title");
  const isButtonDisabled = !title || !!errors.title;

  return (
    <Box
      className={classes.container}
      component="form"
      onSubmit={handleSubmit(onSaveShoppingList)}
    >
      <Input
        classes={{
          root: classes.inputRoot,
          input: classes.input,
          disabled: classes.inputDisabled
        }}
        disabled={isDisabled}
        error={!!errors.title}
        placeholder="Enter a name"
        {...register("title")}
      />
      <CustomButton
        className={classes.button}
        disabled={isButtonDisabled}
        theme="primary"
        type="submit"
      >
        Save
      </CustomButton>
    </Box>
  );
};

SaveShoppingList.displayName = "SaveShoppingList";

export default memo(SaveShoppingList);
