import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "100%"
  },
  asidePanel: {
    width: "94px"
  },
  main: {
    position: "relative",
    overflowY: "auto",
    height: "100vh",
    width: "calc(100vw - 94px - 389px)",
    padding: "37.5px 80.5px"
  },
  cardContainer: {
    maxWidth: "389px",
    width: "100%"
  }
});
