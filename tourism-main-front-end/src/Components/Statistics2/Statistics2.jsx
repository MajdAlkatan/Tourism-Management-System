import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';
import './Statistics2.css';

function PieChartWithPaddingAngle({ value1, value2, value3, value4, label1, label2, label3, label4 }) {
  const data = [
    { label: label1, value: value1 },
    { label: label2, value: value2 },
    { label: label3, value: value3 },
    { label: label4, value: value4 },
  ];

  return (
    <div className="container2">
      <Stack direction="row">
        <PieChart
          series={[
            {
              startAngle: 0,
              endAngle: 360,
              paddingAngle: 5,
              innerRadius: 60,
              outerRadius: 80,
              data,
            },
          ]}
          margin={{ right: 5 }}
          width={200}
          height={200}
          slotProps={{
            legend: { hidden: true },
          }}
        />
      </Stack>
    </div>
  );
}

PieChartWithPaddingAngle.propTypes = {
  value1: PropTypes.number.isRequired,
  value2: PropTypes.number.isRequired,
  value3: PropTypes.number.isRequired,
  value4: PropTypes.number.isRequired,
  label1: PropTypes.string.isRequired,
  label2: PropTypes.string.isRequired,
  label3: PropTypes.string.isRequired,
  label4: PropTypes.string.isRequired,
};

export default PieChartWithPaddingAngle;