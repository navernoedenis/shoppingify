import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  container: {
    flexShrink: 0,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "42px",
    width: "42px",
    backgroundColor: COLORS.ORANGE_PEEL
  },
  badge: {
    borderRadius: "4px",
    fontSize: "12px",
    backgroundColor: COLORS.BURNT_SIENNA,
    color: COLORS.WHITE,
    transform: "translate(13px, -14px)",
    userSelect: "none"
  },
  cartIcon: {
    fontSize: "25px",
    color: COLORS.WHITE
  }
});
