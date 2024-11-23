import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types'; // Import PropTypes

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

// Define prop types for the component
PieCenterLabel.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is passed
};

export default function PieChartWithCenterLabel({ likes }) {
  // Create the data for the PieChart
  const data = [
    { value: likes, label: 'Likes', color: '#36A2EB' }, // Color for likes
    { value: 10 - likes,  color: '#FF0264' }, // Color for others
  ];

  const size = {
    width: 400,
    height: 200,
  };

  return (
    <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
      <PieCenterLabel>{likes} Likes</PieCenterLabel>
    </PieChart>
  );
}

// Validate prop types
PieChartWithCenterLabel.propTypes = {
  likes: PropTypes.number.isRequired, // Validate that likes is passed
};
