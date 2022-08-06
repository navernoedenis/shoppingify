import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { COLORS } from "app/styles";

interface Props {
  isManageable: boolean;
}

export const useStyles = makeStyles<Theme, Props>({
  container: {
    display: "flex",
    alignItems: "center"
  },
  checkbox: {
    marginRight: "16px"
  },
  title: {
    marginRight: "10px"
  },
  manage: {
    position: "relative",
    marginLeft: "auto",
    borderRadius: "12px",
    padding: "5.5px 0",
    paddingLeft: "17px",
    display: "flex",
    alignItems: "center",
    flexShrink: "0",
    color: COLORS.ORANGE_PEEL,
    transition: "150ms linear",
    backgroundColor: ({ isManageable }) =>
      isManageable ? COLORS.WHITE : "transparent"
  },
  manageTrash: {
    position: "absolute",
    top: "0",
    left: "-26px",
    bottom: "0",
    marginRight: "9.5px",
    border: "none",
    borderRadius: "12px",
    padding: "10px 8.5px",
    color: COLORS.WHITE,
    cursor: "pointer",
    backgroundColor: COLORS.ORANGE_PEEL,
    transition: "150ms linear",
    opacity: ({ isManageable }) => (isManageable ? "1" : "0"),
    visibility: ({ isManageable }) => (isManageable ? "visible" : "hidden")
  },
  manageTrashIcon: {
    fontSize: "20px"
  },
  manageIcon: {
    margin: "0 4px",
    fontSize: "26px",
    cursor: "pointer",
    transition: "200ms ease-out",
    opacity: ({ isManageable }) => (isManageable ? "1" : "0"),
    visibility: ({ isManageable }) => (isManageable ? "visible" : "hidden")
  },
  manageButton: {
    borderRadius: "24px",
    border: `2px solid ${COLORS.ORANGE_PEEL}`,
    padding: "7.5px",
    minWidth: "74px",
    textAlign: "center",
    transition: "150ms linear",
    cursor: "pointer",
    color: COLORS.ORANGE_PEEL,
    transform: ({ isManageable }) =>
      `translateX(${isManageable ? "0" : "45%"})`,

    "&:disabled": {
      backgroundColor: "transparent",
      color: "inherit"
    }
  },
  manageButtonQuantity: {
    fontWeight: "700",
    userSelect: "none"
  }
});
