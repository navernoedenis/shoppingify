import { FC, memo } from "react";
import { useStyles } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomButton from "components/custom-button";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface CreateProductProps {
  categories: string[];
  onCancelCreate: () => void;
  onCreateProduct: (data: Omit<Product, "id">) => void;
}

function replaceEmptyStringToNull(value: string, initialValue: string) {
  return initialValue ? value : null;
}

const schema = yup.object({
  name: yup.string().min(3).required(),
  note: yup
    .string()
    .optional()
    .min(10)
    .nullable()
    .transform(replaceEmptyStringToNull),
  image: yup
    .string()
    .optional()
    .url()
    .nullable()
    .transform(replaceEmptyStringToNull),
  category: yup.string().min(3).required()
});

const CreateProduct: FC<CreateProductProps> = ({
  categories,
  onCancelCreate,
  onCreateProduct
}) => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Omit<Product, "id">>({
    resolver: yupResolver(schema),
    defaultValues: { note: null, image: null }
  });

  return (
    <Box
      className={classes.container}
      component="form"
      onSubmit={handleSubmit(onCreateProduct)}
    >
      <Typography className={classes.title} variant="h2">
        Add a new item
      </Typography>

      <Stack className={classes.fields} spacing="24px">
        <TextField
          error={!!errors.name}
          helperText={errors?.name?.message}
          label="Name"
          placeholder="Enter a name"
          {...register("name")}
        />

        <TextField
          error={!!errors.note}
          helperText={errors?.note?.message}
          label="Note (optional)"
          placeholder="Enter a note"
          multiline
          rows={4}
          {...register("note")}
        />

        <TextField
          error={!!errors.image}
          helperText={errors?.image?.message}
          label="Image (optional)"
          placeholder="Enter a url"
          {...register("image")}
        />

        <Autocomplete
          freeSolo
          options={categories}
          renderInput={(params) => (
            <TextField
              error={!!errors.category}
              helperText={errors?.category?.message}
              label="Category"
              placeholder="Enter a category"
              {...register("category")}
              {...params}
            />
          )}
        />
      </Stack>

      <Stack
        className={classes.buttons}
        spacing="15px"
        direction="row"
        justifyContent="center"
      >
        <CustomButton onClick={onCancelCreate}>cancel</CustomButton>
        <CustomButton theme="primary" type="submit">
          Save
        </CustomButton>
      </Stack>
    </Box>
  );
};

CreateProduct.displayName = "CreateProduct";

export default memo(CreateProduct);
