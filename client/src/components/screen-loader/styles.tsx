import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  fullscreenContainer: {
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: "1000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.WHITE
  },
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  }
});
