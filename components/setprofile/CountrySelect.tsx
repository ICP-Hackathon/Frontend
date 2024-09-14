import React, { useState, useMemo } from "react";
import Select from "react-select";
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
        className="w-full"
        classNamePrefix="react-select"
        placeholder="Select a country"
        id="country"
      />
    </div>
  );
};

export default CountrySelect;
