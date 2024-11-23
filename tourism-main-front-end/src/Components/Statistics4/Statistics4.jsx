import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import './Statistics4.css';
import PropTypes from 'prop-types';


function Statistics4({uv1,uv2,uv3,uv4,uv5,uv6,uv7}) {
  const data = [
    {
      name: '18-24',
      uv: uv1,
      pv: 2400,
      fill: '#8884d8',
    },
    {
      name: '25-29',
      uv: uv2,
      pv: 4567,
      fill: '#83a6ed',
    },
    {
      name: '30-34',
      uv:uv3 ,
      pv: 1398,
      fill: '#8dd1e1',
    },
    {
      name: '35-39',
      uv: uv4,
      pv: 9800,
      fill: '#82ca9d',
    },
    {
      name: '40-49',
      uv: uv5,
      pv: 4800,
      fill: '#a4de6c',
    },
    {
      name: '50+',
      uv: uv6,
      pv: 4800,
      fill: '#d0ed57',
    },
    {
      name: 'unknown',
      uv: uv7,
      pv: 4800,
      fill: '#ffc658',
    },
  ];
  return (
    <div className='container4'>
      <RadialBarChart
        width={397}
        height={350}
        cy={145}
        innerRadius="10%"
        outerRadius="100%"
        data={data}
        startAngle={360}
        endAngle={0}
      >
        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey="uv" />
        <Legend iconSize={10} width={320} height={40} layout="horizontal" verticalAlign="bottom" align="left" margin='10px' />
        <Tooltip />
      </RadialBarChart>
    </div>
  );
}
Statistics4.propTypes ={
  uv1: PropTypes.number.isRequired,
  uv2: PropTypes.number.isRequired,
  uv3: PropTypes.number.isRequired,
  uv4: PropTypes.number.isRequired,
  uv5: PropTypes.number.isRequired,
  uv6: PropTypes.number.isRequired,
  uv7: PropTypes.number.isRequired,}

export default Statistics4;