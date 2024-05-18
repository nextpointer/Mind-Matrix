/* eslint-disable react/prop-types */
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import styled from "styled-components";

export default function RadioInput({ name, value, onChange }) {
  return (
    <FormControl>
      {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <Organise>
          <FormControlLabel
            value="Male"
            control={<Radio />}
            label="Male"
            name={name}
            checked={value === "Male"}
            onChange={onChange}
          />
          <FormControlLabel
            value="Female"
            control={<Radio />}
            label="Female"
            name={name}
            checked={value === "Female"}
            onChange={onChange}
          />
          <FormControlLabel
            value="Other"
            control={<Radio />}
            label="Other"
            name={name}
            checked={value === "Other"}
            onChange={onChange}
          />
        </Organise>
      </RadioGroup>
    </FormControl>
  );
}

const Organise = styled.div`
  height: 7vh;
  width: 300px;
  /* background-color: #6d6d6d; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px 0 10px;
  border-radius: 24px;
  border: 1px solid #a5a4a4;
`;
