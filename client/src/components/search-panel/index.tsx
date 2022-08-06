import { FC, ChangeEvent } from "react";
import { useStyles } from "./styles";

import Card from "@mui/material/Card";
import SearchIcon from "@mui/icons-material/Search";

interface SearchPanelProps {
  placeholder: string;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchPanel: FC<SearchPanelProps> = ({ onSearch, placeholder }) => {
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <SearchIcon className={classes.icon} />
      <input
        className={classes.input}
        onChange={onSearch}
        placeholder={placeholder}
        type="text"
      />
    </Card>
  );
};

SearchPanel.displayName = "SearchPanel";

export default SearchPanel;
