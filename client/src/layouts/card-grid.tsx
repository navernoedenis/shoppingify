import { FC, ReactNode } from "react";
import { makeStyles } from "@mui/styles";

import Box from "@mui/material/Box";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    columnGap: "19.5px",
    rowGap: "27.5px",

    "& > div": {
      maxWidth: "182px",
      width: "100%"
    }
  }
});

interface CardGridLayoutProps {
  children: ReactNode;
  className?: string;
}

const CardGridLayout: FC<CardGridLayoutProps> = ({ children, className }) => {
  const classes = useStyles();

  return (
    <Box className={`${classes.container} ${className ?? ""}`}>{children}</Box>
  );
};

export default CardGridLayout;
