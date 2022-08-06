import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  header: {
    marginBottom: "57px"
  },
  headerTitle: {
    maxWidth: "450px",

    "& span": {
      fontWeight: "700"
    }
  },
  headerSearch: {
    marginLeft: "30px"
  },
  hint: {
    marginTop: "42vh"
  }
});
