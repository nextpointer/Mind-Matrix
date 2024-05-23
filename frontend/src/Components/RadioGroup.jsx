// RadioGroup.js
import * as React from "react";
import Radio from "@mui/material/Radio";
import PropTypes from "prop-types";
import "../styles/ComponentStyle/radiogroup.css";

export default function RadioGroup({ value, onChange }) {
  const [selectedValue, setSelectedValue] = React.useState(value);

  // Update selected value when the parent component changes it
  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    // Call the parent onChange function with the new value
    onChange(newValue);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <div className="radio">
      <Radio
        {...controlProps("1")}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 28,
          },
        }}
      />
      <Radio
        {...controlProps("2")}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 32,
          },
        }}
      />
      <Radio
        {...controlProps("3")}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 38,
          },
        }}
      />
      <Radio
        {...controlProps("4")}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 32,
          },
        }}
      />
      <Radio
        {...controlProps("5")}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 28,
          },
        }}
      />
    </div>
  );
}

// Define prop types for the component
RadioGroup.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
