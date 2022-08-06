import { makeStyles } from "@mui/styles";
import { COLORS } from "../../../app/styles";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  title: {
    marginRight: "10px"
  },
  quantity: {
    flexShrink: "0",
    color: COLORS.ORANGE_PEEL
  }
});
