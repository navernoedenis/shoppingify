import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    padding: "13px 16px"
  },
  icon: {
    marginRight: "15px",
    fontSize: "24px",
    color: COLORS.REVOLVER
  },
  input: {
    outline: "none",
    border: "none",
    padding: "0 0 0 5px",
    fontFamily: "inherit",
    fontSize: "14px",
    lineHeight: "18px",
    fontWeight: "500",
    cursor: "pointer",

    "&::placeholder": {
      color: COLORS.GHOST
    }
  }
});
