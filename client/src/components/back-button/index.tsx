import { FC, memo } from "react";
import { useStyles } from "./styles";

import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ArrowIcon from "@mui/icons-material/ArrowRightAltRounded";

const BackButton: FC<ButtonProps> = (props) => {
  const classes = useStyles();

  return (
    <Button className={classes.container} {...props}>
      <ArrowIcon className={classes.icon} />
      <Typography className={classes.text} variant="body1">
        back
      </Typography>
    </Button>
  );
};

export default memo(BackButton);
