import { FC } from "react";
import { TailSpin } from "react-loader-spinner";
import { useStyles } from "./styles";

import Box from "@mui/material/Box";

import { COLORS } from "app/styles";

interface SceenLoaderProps {
  fullscreen?: boolean;
}

const SceenLoader: FC<SceenLoaderProps> = ({ fullscreen = false }) => {
  const classes = useStyles();

  const container = fullscreen
    ? classes.fullscreenContainer
    : classes.container;

  return (
    <Box className={`${container}`}>
      <TailSpin
        ariaLabel="Loading..."
        color={COLORS.ORANGE_PEEL}
        height={200}
        width={200}
      />
    </Box>
  );
};

SceenLoader.displayName = "SceenLoader";

export default SceenLoader;
