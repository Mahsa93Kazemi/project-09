import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="جستجو بر اساس نام یا ایمیل"
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
