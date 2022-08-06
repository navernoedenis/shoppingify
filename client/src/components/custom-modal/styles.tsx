import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  container: {
    outline: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "510px",
    width: "100%",
    borderRadius: "24px",
    padding: "30px",
    backgroundColor: COLORS.WHITE
  },
  closeIcon: {
    position: "absolute",
    top: "15px",
    right: "15px",
    fontSize: "24px",
    color: COLORS.GREY,
    cursor: "pointer"
  }
});
