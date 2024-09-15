import React, { useState, useMemo } from "react";
import Select, { StylesConfig } from "react-select";
import countryList from "react-select-country-list";

interface CountryOption {
  label: string;
  value: string;
}

const CountrySelect: React.FC = () => {
  const [value, setValue] = useState<CountryOption | null>(null);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (selectedOption: CountryOption | null) => {
    setValue(selectedOption);
  };

  const customStyles: StylesConfig<CountryOption, false> = {
    menu: (provided) => ({
      ...provided,
      maxHeight: "200px",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#4F46E5"
        : state.isFocused
        ? "#E0E7FF"
        : "white",
      color: state.isSelected ? "white" : "#111827",
      "&:active": {
        backgroundColor: "#4F46E5",
        color: "white",
      },
    }),
  };

  return (
    <div>
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Country
      </label>
      <Select
        options={options}
        value={value}
        onChange={changeHandler}
        styles={customStyles}
        className="w-full"
        classNamePrefix="react-select"
        placeholder="Select"
        id="country"
      />
    </div>
  );
};

export default CountrySelect;
