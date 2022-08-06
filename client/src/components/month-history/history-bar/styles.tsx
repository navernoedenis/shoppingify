import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  container: {
    padding: "19px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    marginRight: "15px"
  },
  details: {
    flexShrink: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "270px",
    width: "100%"
  },
  status: {
    margin: "0 10px",
    borderRadius: "8px",
    border: "1px solid black",
    padding: "4px 7px",

    "&.cancelled": {
      borderColor: COLORS.BURNT_SIENNA,
      color: COLORS.BURNT_SIENNA
    },
    "&.completed": {
      borderColor: COLORS.MAYA_BLUE,
      color: COLORS.MAYA_BLUE
    }
  },
  arrow: {
    color: COLORS.ORANGE_PEEL,
    cursor: "pointer"
  }
});
