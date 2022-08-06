import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    color: COLORS.GHOST
  },
  icon: {
    marginRight: "10px"
  }
});
