import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  container: {
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center"
  },
  inputRoot: {
    border: `2px solid ${COLORS.ORANGE_PEEL}`,
    borderRadius: "12px",
    width: "100%"
  },
  input: {
    cursor: "pointer",
    padding: "20px 100px 20px 15px"
  },
  inputDisabled: {
    borderColor: COLORS.GHOST,
    cursor: "default"
  },
  button: {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0"
  }
});
