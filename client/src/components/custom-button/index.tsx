import { FC, memo } from "react";
import { useStyles, useButtonStyles } from "./styles";

import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type CustomButtonVariant =
  | "base"
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary";

interface CustomButtonProps extends ButtonProps {
  theme?: CustomButtonVariant;
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  className,
  style,
  theme = "base",
  ...otherProps
}) => {
  const classes = useStyles();
  const buttonTheme = useButtonStyles()[theme];

  return (
    <Button
      className={`${classes.container} ${className ?? ""} ${buttonTheme}`}
      style={{ ...(style ?? {}) }}
      {...otherProps}
    >
      <Typography className={classes.text} variant={"subtitle2"}>
        {children}
      </Typography>
    </Button>
  );
};

CustomButton.displayName = "CustomButton";

export default memo(CustomButton);
