import { BarChart } from '@mui/x-charts/BarChart';
import PropTypes from 'prop-types';
import './Statistics3.css';

function StackBars({ a1, a2, a3, a4, a5, b1, b2, b3, b4, b5, c1, c2, c3, c4, c5 }) {
  return (
    <div className="container3">
      <BarChart
        series={[
          { data: [a1, a2, a3, a4, a5], stack: 'A', label: 'Series A1', color: '#ffAFf0' },
          { data: [b1, b2, b3, b4, b5], stack: 'B', label: 'Series B1', color: '#2196F3' },
          { data: [c1, c2, c3, c4, c5], stack: 'c', label: 'Series C1', color: '#Ff2ff0' },
        ]}
        height={350}
        // sx={{
        //   '&.MuiChartsAxis-line': {
        //     stroke: 'white', // Attempt to change axis color
        //   },
        // }}
      />
    </div>
  );
}

StackBars.propTypes = {
  a1: PropTypes.number.isRequired,
  a2: PropTypes.number.isRequired,
  a3: PropTypes.number.isRequired,
  a4: PropTypes.number.isRequired,
  a5: PropTypes.number.isRequired,
  b1: PropTypes.number.isRequired,
  b2: PropTypes.number.isRequired,
  b3: PropTypes.number.isRequired,
  b4: PropTypes.number.isRequired,
  b5: PropTypes.number.isRequired,
  c1: PropTypes.number.isRequired,
  c2: PropTypes.number.isRequired,
  c3: PropTypes.number.isRequired,
  c4: PropTypes.number.isRequired,
  c5: PropTypes.number.isRequired,
};

export default StackBars;
