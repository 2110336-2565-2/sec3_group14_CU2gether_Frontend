import { Input } from "antd";
import React, { useState } from "react";

const SearchInput = (props: any) => {
  const [search, setSearch] = useState();
  const { onEnter, ...otherProps } = props;

  const onChange = (e: any) => setSearch(e.target.value);

  return (
    <Input.Search
      value={search}
      onChange={onChange}
      onPressEnter={onEnter}
      {...otherProps}
    />
  );
};

export default SearchInput;
