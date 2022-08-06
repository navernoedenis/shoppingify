import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  main: {
    position: "relative",
    overflowY: "auto",
    height: "calc(100vh - 130px)",
    padding: "45px",
    backgroundColor: COLORS.PAPAYA_WHIP
  },
  addItemWrapper: {
    marginBottom: "44px"
  },
  hintText: {
    position: "absolute",
    top: "44vh",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "20px",
    fontWeight: "700",
    textAlign: "center"
  },
  footer: {
    position: "relative",
    padding: "33px 45px",
    backgroundColor: COLORS.WHITE
  },
  footerImage: {
    position: "absolute",
    left: "50%",
    bottom: "91%",
    transform: "translateX(-50%)",
    width: "245px",
    pointerEvents: "none",
    userSelect: "none"
  }
});
