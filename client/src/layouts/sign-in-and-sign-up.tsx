import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { COLORS } from "app/styles";

import CustomModal from "../components/custom-modal";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "100%",
    padding: "20px"
  },
  card: {
    padding: "20px"
  },
  header: {
    marginBottom: "16px",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between"
  },
  headerTitle: {
    marginRight: "20px",
    fontWeight: "700"
  },
  headerLink: {
    flexShrink: "0",
    fontSize: "16px",
    color: COLORS.ORANGE_PEEL
  },
  modal: {
    display: "flex",
    minHeight: "200px"
  },
  modalTitle: {
    margin: "auto",
    textAlign: "center"
  }
});

interface SignInAndSignUpLayoutProps {
  children: ReactNode;
  isSignUp?: boolean;
  modalMessage?: string;
  onModalClose: () => void;
  showModal: boolean;
}

const SignInAndSignUpLayout: FC<SignInAndSignUpLayoutProps> = ({
  children,
  isSignUp = false,
  modalMessage,
  onModalClose,
  showModal
}) => {
  const classes = useStyles();

  const InOrUp = isSignUp ? "up" : "in";
  const InOrUpLink = isSignUp ? "in" : "up";

  return (
    <>
      <Box className={classes.container}>
        <Card className={classes.card}>
          <Box className={classes.header}>
            <Typography className={classes.headerTitle} variant="h1">
              Sign {InOrUp} page
            </Typography>
            <Link className={classes.headerLink} to={`/sign-${InOrUpLink}`}>
              Sign {InOrUpLink}
            </Link>
          </Box>
          <>{children}</>
        </Card>
      </Box>

      <CustomModal
        className={classes.modal}
        open={showModal}
        onCloseModal={onModalClose}
      >
        <Typography className={classes.modalTitle} variant="h1">
          {modalMessage}
        </Typography>
      </CustomModal>
    </>
  );
};

export default SignInAndSignUpLayout;
