import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  container: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "35px 24.5px",
    backgroundColor: COLORS.WHITE,
    height: "100%"
  },
  logo: {
    flexShrink: 0,
    height: "40px",
    width: "40px"
  },
  asideContainer: {
    margin: "30px 0",
    width: "100%"
  }
});
