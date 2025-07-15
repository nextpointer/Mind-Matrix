import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';


const StyledButton = styled(Button)(({ theme }) => ({
  color: '#000000',
  backgroundColor: 'white',
  '&:hover': {
    color: '#000',
    backgroundColor: 'white', 
    border: 'none',
    boxShadow: "0px 0px 20px 1px #5353533e"
  },
  padding: '8px 16px',
  borderRadius: '10px',
  border: 'none',
}));

export default function NormalButtons(props) {
  return (
    <Stack spacing={2} direction="row">
      <StyledButton variant="contained" type={props.type} onClick={props.onClick}>
        {props.text}
      </StyledButton>
    </Stack>
  );
}

NormalButtons.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
