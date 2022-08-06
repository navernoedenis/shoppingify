import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  container: {
    color: COLORS.ORANGE_PEEL,
    transition: "100ms linear",

    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    transform: "rotate(180deg)"
  },
  text: {
    marginLeft: "4px",
    fontWeight: "700"
  }
});
