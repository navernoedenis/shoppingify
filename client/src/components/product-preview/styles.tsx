import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

export const useStyles = makeStyles({
  container: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "100vh",
    padding: "35px 44px",
    backgroundColor: COLORS.WHITE
  },
  buttonContainer: {
    marginBottom: "20px"
  },
  product: {
    marginBottom: "40px"
  },
  productImage: {
    marginBottom: "52px",
    borderRadius: "25px",
    width: "100%",
    height: "220px",
    objectFit: "cover"
  },
  productAbout: {},
  productItem: {},
  productTitle: {
    marginBottom: "11px",
    color: COLORS.GHOST
  },
  productSubtitle: {
    textTransform: "capitalize"
  },
  buttons: {
    marginTop: "auto",
    width: "100%"
  }
});
