import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledTabs = styled(Tabs)({
  borderRadius: '24px',
  backdropFilter: 'blur(10px)',
  background: 'rgba(255, 255, 255, 0.2)',
  '& .MuiTabs-indicator': {
    backgroundColor: 'black', // Change the underline color to black
  },
});

const StyledTab = styled(Tab)(({ theme }) => ({
  margin: '0 8px',
  '&.Mui-selected': {
    background: 'transparent',
    color: 'black', // Change the font color of the selected tab to black
  },
  '&:not(.Mui-selected)': {
    color: 'rgba(0, 0, 0, 0.6)', // Optional: Change the font color of non-selected tabs
  },
}));

const Tabss = ({ value, handleChange }) => {
  return (
    <Box sx={{ maxWidth: { xs: 300, sm: 600 }, bgcolor: "transparent", padding: "10px" }}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <StyledTab label="Anxiety" />
        <StyledTab label="Depression" />
        <StyledTab label="Stress" />
        <StyledTab label="Motivation" />
        <StyledTab label="Podcast" />
      </StyledTabs>
    </Box>
  );
};

export default Tabss;
