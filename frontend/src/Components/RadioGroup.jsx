import * as React from "react";
import Radio from "@mui/material/Radio";
import "../styles/ComponentStyle/radiogroup.css";

export default function RadioGroup() {
  const [selectedValue, setSelectedValue] = React.useState("a");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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
        {...controlProps("a")}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 28,
          },
        }}
      />
      <Radio
        {...controlProps("b")}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 32,
          },
        }}
      />
      <Radio
        {...controlProps("c")}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 38,
          },
        }}
      />
      <Radio
        {...controlProps("d")}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 32,
          },
        }}
      />
      <Radio
        {...controlProps("e")}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 28,
          },
        }}
      />
    </div>
  );
}
