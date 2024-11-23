import { LineChart } from '@mui/x-charts/LineChart';
import PropTypes from 'prop-types';
import './Statistics1.css';

function GridDemo({ series1, series2, series3, series4, series5, series6, px1, px2, px3, px4, px5, px6 }) {
  return (
    <div className="container1">
      <LineChart
        xAxis={[{ data: [px1, px2, px3, px4, px5, px6] }]} 
        series={[{ data: [series1, series2, series3, series4, series5, series6], },]}
        height={300}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
}

GridDemo.propTypes = {
  series1: PropTypes.number.isRequired,
  series2: PropTypes.number.isRequired,
  series3: PropTypes.number.isRequired,
  series4: PropTypes.number.isRequired,
  series5: PropTypes.number.isRequired,
  series6: PropTypes.number.isRequired,
  px1: PropTypes.number.isRequired,
  px2: PropTypes.number.isRequired,
  px3: PropTypes.number.isRequired,
  px4: PropTypes.number.isRequired,
  px5: PropTypes.number.isRequired,
  px6: PropTypes.number.isRequired,
};

export default GridDemo;