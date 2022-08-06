import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  container: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    padding: "35px"
  },
  title: {
    marginBottom: "34px"
  },
  fields: {
    marginBottom: "30px"
  },
  buttons: {
    marginTop: "auto"
  }
});
