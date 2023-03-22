import { Input } from "antd";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import theme from "@/utils/theme";

const SearchInput = (props: any) => {
  const [search, setSearch] = useState();
  const { onEnter, ...otherProps } = props;

  const onChange = (e: any) => setSearch(e.target.value);

  return (
    <Input
      prefix={<SearchIcon sx={{ color: theme.color.backgroundOnHover }} />}
      value={search}
      onChange={onChange}
      onPressEnter={onEnter}
      {...otherProps}
    />
  );
};

export default SearchInput;
