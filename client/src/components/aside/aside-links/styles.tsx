import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  link: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10.5px 0",

    "&::before": {
      opacity: 0,
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
      top: 0,
      left: "-25px",
      bottom: 0,
      position: "absolute",
      height: "100%",
      width: "6px",
      content: '""',
      backgroundColor: COLORS.ORANGE_PEEL,
      transition: "120ms linear"
    },

    "&.active::before": {
      opacity: "1"
    }
  },
  linkIcon: {
    color: COLORS.CHARCOAL,
    fontSize: "24px"
  }
});
