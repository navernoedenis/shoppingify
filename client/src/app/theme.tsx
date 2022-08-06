import { createTheme } from "@mui/material/styles";
import { COLORS, SHADOWS } from "./styles";

// Global typography variants:
// font-size: 26px, line-height: 32.5px, font-weight: 500; // h1
// font-size: 24px, line-height: 30px, font-weight: 500; // h2

// font-size: 18px, line-height: 22.5px, font-weight: 500; // subtitle1
// font-size: 16px, line-height: 20px, font-weight: 500; // subtitle2

// font-size: 14px, line-height: 17.5px, font-weight: 500; // body1
// font-size: 12px, line-height: 15px, font-weight: 500; // body2

export const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: "0",

            "& .MuiAutocomplete-input": {
              padding: "21.5px 17.5px",
              paddingRight: "0"
            }
          }
        },
        paper: {
          transform: "translateY(12px)",
          boxShadow: "none"
        },
        listbox: {
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "8px",
          borderRadius: "12px",
          border: `1px solid ${COLORS.GAINSBORO}`,

          "& .MuiAutocomplete-option": {
            padding: "11px 22px",
            textTransform: "capitalize"
          },
          "& .MuiAutocomplete-option[aria-selected=true]": {
            backgroundColor: COLORS.WHITE_SMOKE,

            "&.Mui-focused": {
              backgroundColor: COLORS.WHITE_SMOKE
            }
          }
        },
        option: {
          borderRadius: "12px",
          fontSize: "18px",
          lineHeight: "22px",
          color: COLORS.GREY,

          "&[aria-selected=true]": {
            color: COLORS.REVOLVER
          }
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.2)"
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          textTransform: "initial",
          color: COLORS.REVOLVER,

          "&:hover": {
            opacity: "0.75"
          },
          "&:disabled": {
            backgroundColor: COLORS.GHOST,
            color: COLORS.WHITE
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: SHADOWS.PRIMARY,
          borderRadius: "12px",
          minHeight: "50px",
          padding: "13px 16px"
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "0",
          color: COLORS.ORANGE_PEEL,

          "&.Mui-checked": {
            color: COLORS.ORANGE_PEEL
          }
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          height: "6px",
          backgroundColor: COLORS.GAINSBORO
        },
        bar: {
          borderRadius: "4px",
          backgroundColor: COLORS.ORANGE_PEEL
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        autoComplete: "off"
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            input: {
              padding: "21.5px 17.5px",
              cursor: "pointer"
            },
            fieldset: {
              borderColor: COLORS.SILVER,
              borderWidth: "2px",
              cursor: "pointer",
              borderRadius: "12px"
            },
            "&:hover": {
              fieldset: {
                borderColor: COLORS.GREY
              }
            },
            "&.Mui-focused": {
              fieldset: {
                borderColor: COLORS.ORANGE_PEEL
              },

              "&.Mui-error": {
                fieldset: {
                  borderColor: COLORS.BURNT_SIENNA
                }
              }
            }
          }
        }
      }
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true
      },
      styleOverrides: {
        root: {
          marginBottom: "6px",
          position: "static",
          transform: "none",
          color: COLORS.REVOLVER,

          "&.Mui-focused ": {
            color: COLORS.ORANGE_PEEL,

            "&.Mui-error": {
              color: COLORS.BURNT_SIENNA
            }
          }
        }
      }
    },
    MuiInput: {
      defaultProps: {
        disableUnderline: true
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline legend": {
            maxWidth: "0"
          }
        }
      }
    }
  },
  typography: {
    fontFamily: "Quicksand, sans-serif",
    fontWeightBold: "500",
    h1: {
      fontSize: "26px",
      lineHeight: "32.5px"
    },
    h2: {
      fontSize: "24px",
      lineHeight: "30px"
    },
    subtitle1: {
      fontSize: "18px",
      lineHeight: "22.5px"
    },
    subtitle2: {
      fontSize: "16px",
      lineHeight: "20px"
    },
    body1: {
      fontSize: "14px",
      lineHeight: "17.5px"
    },
    body2: {
      fontSize: "12px",
      lineHeight: "15px"
    }
  }
});
