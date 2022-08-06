import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  container: {
    position: "relative",
    display: "flex",
    borderRadius: "24px",
    backgroundColor: COLORS.SOLID_PINK,
    padding: "18px 27px 18px 122px"
  },
  icon: {
    position: "absolute",
    left: "28px",
    bottom: "15px",
    height: "128px",
  },
  title: {
    marginBottom: "13.5px",
    color: COLORS.WHITE,
    fontWeight: "700"
  }
});
