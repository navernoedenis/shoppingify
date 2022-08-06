import { FC } from "react";
import { useStyles } from "./styles";

import Typography, { TypographyProps } from "@mui/material/Typography";

interface NoDataHintProps extends TypographyProps {
  message: string;
  icon?: string;
  iconRepeat?: number;
}

const NoDataHint: FC<NoDataHintProps> = ({
  className,
  message,
  icon = "",
  iconRepeat = 1
}) => {
  const classes = useStyles();

  return (
    <Typography className={`${classes.title} ${className ?? ""}`} variant="h1">
      {message} {icon.repeat(iconRepeat)}
    </Typography>
  );
};

export default NoDataHint;
