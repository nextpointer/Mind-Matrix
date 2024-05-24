import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const StyledButton = styled(Button)(({ }) => ({
  color: '#000000',
  backgroundColor: 'transparent',
  '&:hover': {
    color: '#000',
    backgroundColor: 'white', 
    // border: '1px solid #5e5e5e',,
    border:'none',
    boxShadow: "0px 0px 20px 1px #5353533e"
  },
  padding: '8px 16px',
  borderRadius: '24px',
  border: '1px solid #5e5e5e',
}));

export default function NormalButtons(props) {
  return (
    <Stack spacing={2} direction="row">
      <StyledButton variant="outlined" type={props.type}>{props.text}</StyledButton>
    </Stack>
  );
}

NormalButtons.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
