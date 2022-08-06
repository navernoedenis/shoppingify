import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  header: {
    marginBottom: "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  headerTitle: {
    marginRight: "12px",
    fontWeight: "700"
  },
  headerIcon: {
    fontSize: "22px"
  },
  categories: {},
  category: {},
  categoryTitle: {
    marginBottom: "16px",
    color: COLORS.GREY
  }
});
