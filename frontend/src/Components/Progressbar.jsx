
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function CircularDetermin() {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <CircularProgress
        variant="determinate"
        value={75} // Set the value to the desired percentage
        size={150} // Adjust size here
        sx={{ color: '#ffffff' }} // Adjust color here
      >
        <Typography variant="caption" component="div" color="textSecondary">
          75% 
        </Typography>
      </CircularProgress>
    </Stack>
  );
}
