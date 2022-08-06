import { FC } from "react";
import { useStyles } from "./styles";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal, { ModalProps } from "@mui/material/Modal";

import CloseIcon from "@mui/icons-material/CloseRounded";

interface CustomModalProps extends ModalProps {
  className?: string;
  onCloseModal: () => void;
}

const CustomModal: FC<CustomModalProps> = ({
  children,
  className,
  onCloseModal,
  open,
  ...otherProps
}) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      {...otherProps}
    >
      <Fade in={open}>
        <Box className={`${classes.container} ${className ?? ""}`}>
          <CloseIcon className={classes.closeIcon} onClick={onCloseModal} />
          <>{children}</>
        </Box>
      </Fade>
    </Modal>
  );
};

CustomModal.displayName = "CustomModal";

export default CustomModal;
