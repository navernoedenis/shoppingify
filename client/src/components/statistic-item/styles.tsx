import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  container: {},
  header: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between"
  },
  title: {
    marginRight: "20px",
    textTransform: "capitalize"
  },
  percentages: {
    flexShrink: "0"
  },
  progressBar: {
    marginTop: "14.5px"
  }
});
