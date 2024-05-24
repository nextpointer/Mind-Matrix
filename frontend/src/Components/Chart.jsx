
import { LineChart } from '@mui/x-charts/LineChart';

export default function Chart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10,12,14,16] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5,7,2.5,0.5],
        },
      ]}
      width={800}
      height={300}
    />
  );
}