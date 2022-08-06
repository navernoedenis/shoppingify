import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    cursor: "pointer",
    userSelect: "none",
    textTransform: "capitalize",
    transition: "100ms linear",

    "&:hover": {
      fontWeight: "700"
    }
  },
  button: {
    marginLeft: "10px",
    padding: "0",

    "&:disabled": {
      opacity: 0.25
    }
  }
});
