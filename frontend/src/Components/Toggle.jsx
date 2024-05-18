import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useCallback } from "react";

const StyledToggleButton = styled(ToggleButton)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.main : "transparent",
  color: selected ? theme.palette.common.white : theme.palette.primary.main,
  "&:hover": {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.primary.light,
  },
  borderRadius: "4px",
  padding: "4px 8px",
  position: "absolute",
  top: "-14px",
  right: "1px",
}));

const Toggle = ({ name, checked, onChange }) => {
  const handleChange = useCallback(() => {
    onChange({ target: { name, value: !checked, type: "checkbox" } });
  }, [name, checked, onChange]);

  return (
    <div style={{ position: "relative" }}>
      <StyledToggleButton
        selected={checked}
        value={checked}
        onChange={handleChange}
        size="small"
      >
        <CheckIcon fontSize="small" />
      </StyledToggleButton>
    </div>
  );
};

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default Toggle;
