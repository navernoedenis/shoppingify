import GlobalStyles from "@mui/material/GlobalStyles";

export enum COLORS {
  BLACK = "#000000",
  BURNT_SIENNA = "#EB5757",
  CHARCOAL = "#454545",
  GAINSBORO = "#E0E0E0",
  GHOST = "#C1C1C4",
  GREY = "#828282",
  LAVENDER = "#FAFAFE",
  MAYA_BLUE = "#56CCF2",
  ORANGE_PEEL = "#F9A109",
  PAPAYA_WHIP = "#FFF0DE",
  REVOLVER = "#34333A",
  SILVER = " #BDBDBD",
  SOLID_PINK = "#80485B",
  WHITE = "#FFFFFF",
  WHITE_SMOKE = "#F2F2F2"
}

export enum SHADOWS {
  PRIMARY = "0 2px 12px rgba(0, 0, 0, 0.05)"
}

export const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        fontFamily: "Quicksand, sans-serif",
        backgroundColor: COLORS.LAVENDER
      },
      "#root": {
        display: "flex",
        height: "100vh"
      },
      "h1, h2, h3, h4, h5, h6": {
        margin: 0
      },
      a: {
        textDecoration: "none"
      }
    }}
  />
);
