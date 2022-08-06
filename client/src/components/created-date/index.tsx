import { FC } from "react";
import { useStyles } from "./styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CalendarIcon from "@mui/icons-material/EventNoteRounded";

import { getDayMonthAndYear, getWeekDay } from "helpers/date";

interface CreatedDateProps {
  date: Date;
}

const CreatedDate: FC<CreatedDateProps> = ({ date }) => {
  const classes = useStyles();
  const { year, month, day } = getDayMonthAndYear(date);

  return (
    <Box className={classes.container}>
      <CalendarIcon className={classes.icon} />
      <Typography variant="body2">
        {getWeekDay(date).substring(0, 3)} {day}.{month}.{year}
      </Typography>
    </Box>
  );
};

CreatedDate.displayName = "CreatedDate";

export default CreatedDate;
