import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  container: {
    border: "none",
    cursor: "pointer",
    padding: "20px 25px",
    borderRadius: "12px",
    transition: "100ms linear"
  },
  text: {
    fontWeight: "700"
  }
});

export const useButtonStyles = makeStyles({
  base: {
    "&, &:hover": {
      backgroundColor: "transparent"
    }
  },
  primary: {
    "&, &:hover": {
      backgroundColor: COLORS.ORANGE_PEEL,
      color: COLORS.WHITE
    }
  },
  secondary: {
    "&, &:hover": {
      backgroundColor: COLORS.MAYA_BLUE,
      color: COLORS.WHITE
    }
  },
  tertiary: {
    "&, &:hover": {
      backgroundColor: COLORS.WHITE
    }
  },
  quaternary: {
    "&, &:hover": {
      backgroundColor: COLORS.BURNT_SIENNA,
      color: COLORS.WHITE
    }
  }
});
