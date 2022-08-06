import { FC, useState, useCallback, memo } from "react";
import { useStyles } from "./styles";

import CustomButton from "components/custom-button";
import CustomModal from "components/custom-modal";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface CompleteButtonsProps {
  onCloseShoppingList: (status: ShoppingListStatus) => void;
}

const CompleteButtons: FC<CompleteButtonsProps> = ({ onCloseShoppingList }) => {
  const classes = useStyles();
  const [showModal, setModal] = useState(false);

  const handleShowModal = useCallback(() => {
    setModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModal(false);
  }, []);

  const handleCancelAndCloseModal = useCallback(() => {
    onCloseShoppingList("cancelled");
    setModal(false);
  }, [onCloseShoppingList]);

  const handleComplete = useCallback(() => {
    onCloseShoppingList("completed");
  }, [onCloseShoppingList]);

  return (
    <>
      <Stack spacing="15px" direction="row" justifyContent="center">
        <CustomButton onClick={handleShowModal}>cancel</CustomButton>
        <CustomButton onClick={handleComplete} theme="secondary">
          Complete
        </CustomButton>
      </Stack>

      <CustomModal open={showModal} onCloseModal={handleCloseModal}>
        <>
          <Typography className={classes.modalTitle} variant="h2">
            Are you sure that you want to cancel this list?
          </Typography>
          <Stack spacing="5px" direction="row" justifyContent="flex-end">
            <CustomButton onClick={handleCloseModal}>cancel</CustomButton>
            <CustomButton
              className={classes.modalButtonYes}
              onClick={handleCancelAndCloseModal}
              theme="quaternary"
            >
              Yes
            </CustomButton>
          </Stack>
        </>
      </CustomModal>
    </>
  );
};

CompleteButtons.displayName = "CompleteButtons";

export default memo(CompleteButtons);
