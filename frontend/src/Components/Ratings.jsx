import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function Ratings() {
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating-read"
        defaultValue={4.5}
        precision={0.5}
        readOnly
        sx={{
          '& .MuiRating-iconFilled': {
            color: '#78d299', // Change this to your desired color
          },
          '& .MuiRating-iconEmpty': {
            color: '#919191', // Optional: Change the color of empty icons
          }
        }}
      />
    </Stack>
  );
}