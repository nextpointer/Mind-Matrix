import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark,
  },
  padding: '8px 16px',
  borderRadius: '24px',
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
