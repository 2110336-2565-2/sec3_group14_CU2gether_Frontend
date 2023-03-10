import { Input } from "antd";
import React, { useState } from "react";

type SearchInputProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
  onEnter: (e: any) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  onEnter,
}) => {
  const [search, setSearch] = useState();

  const onChange = (e: any) => setSearch(e.target.value);

  return (
    <Input.Search
      value={search}
      placeholder={placeholder}
      onChange={onChange}
      onSearch={onSearch}
      onPressEnter={onEnter}
    />
  );
};

export default SearchInput;
