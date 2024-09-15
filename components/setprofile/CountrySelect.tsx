import { useMemo } from "react";
import Select, { StylesConfig } from "react-select";
import countryList from "react-select-country-list";

interface CountryOption {
  label: string;
  value: string;
}

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (selectedOption: CountryOption | null) => {
    onChange(selectedOption?.value || "");
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
    control: (provided) => ({
      ...provided,
      borderRadius: "0",
      borderWidth: "0 0 1px 0",
      borderColor: "#E5E7EB",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#4F46E5",
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
        value={options.find((option) => option.value === value) || null}
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
