import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { useStyles } from "./styles";

import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import HistoryIcon from "@mui/icons-material/Replay";
import ItemsIcon from "@mui/icons-material/FormatListBulleted";
import StatisticIcon from "@mui/icons-material/AssessmentOutlined";

const AsideLinks: FC = () => {
  const classes = useStyles();

  return (
    <Stack
      direction="column"
      spacing={{
        mobile: "30px",
        tablet: "30px",
        laptop: "30px",
        desktop: "35px"
      }}
    >
      <Tooltip title="items" placement="right" arrow>
        <NavLink className={classes.link} to="items">
          <ItemsIcon className={classes.linkIcon} />
        </NavLink>
      </Tooltip>

      <Tooltip title="history" placement="right" arrow>
        <NavLink className={classes.link} to="history">
          <HistoryIcon className={classes.linkIcon} />
        </NavLink>
      </Tooltip>

      <Tooltip title="statistics" placement="right" arrow>
        <NavLink className={classes.link} to="statistics">
          <StatisticIcon className={classes.linkIcon} />
        </NavLink>
      </Tooltip>
    </Stack>
  );
};

AsideLinks.displayName = "AsideLinks";

export default memo(AsideLinks);
