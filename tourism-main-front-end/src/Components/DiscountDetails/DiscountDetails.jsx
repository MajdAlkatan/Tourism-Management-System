import './DiscountDetails.css'; // Import custom CSS for styling
import PropTypes from 'prop-types'; // For type-checking
import Delete from '../DetleteButton/DeleteButton2/DeleteButton2'; // Import the Delete component

const DiscountDetails = ({ discountData, services, events, onDelete }) => {
  // Group discounts by their type
  const groupedDiscounts = {
    'all service ,null event': [],
    'specific service ,null event': [],
    'all service ,specific event': [],
    'specific service ,specific event': [],
  };

  discountData.results.forEach(discount => {
    if (groupedDiscounts[discount.type]) {
      groupedDiscounts[discount.type].push(discount);
    }
  });

  // Helper function to get descriptive type
  const getDescription = (type) => {
    switch(type) {
      case 'all service ,null event':
        return 'Discount applicable to all services';
      case 'specific service ,null event':
        return 'Discount applicable to a specific service';
      case 'all service ,specific event':
        return 'Discount applicable to all services for a specific event';
      case 'specific service ,specific event':
        return 'Discount applicable to a specific service for a specific event';
      default:
        return 'Unknown discount type';
    }
  };

  // Helper function to render a table
  const renderTable = (discounts) => (
    <table className="discount-table">
      <thead>
        <tr>
          <th>Service</th>
          <th>Event</th>
          <th>Percent</th>
          <th>Type</th>
          <th>Created</th>
          <th>Modified</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {discounts.map((discount) => {
          const serviceName = services.find(service => service.id === discount.service)?.name || 'N/A';
          const eventName = events.find(event => event.id === discount.event)?.name || 'N/A';
          return (
            <tr key={discount.id}>
              <td>{serviceName}</td>
              <td>{eventName}</td>
              <td>{discount.percent}%</td>
              <td>{getDescription(discount.type)}</td>
              <td>{new Date(discount.created).toLocaleString()}</td>
              <td>{new Date(discount.modified).toLocaleString()}</td>
              <td>
                <Delete onClick={() => onDelete(discount.id)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="discount-details-container">
      <h1>Discount Details</h1>
      {Object.keys(groupedDiscounts).map(type => (
        groupedDiscounts[type].length > 0 && (
          <div key={type}>
            <h2>{getDescription(type)}</h2>
            {renderTable(groupedDiscounts[type], type)}
          </div>
        )
      ))}
    </div>
  );
};

// Type-checking for props
DiscountDetails.propTypes = {
  discountData: PropTypes.shape({
    count: PropTypes.number.isRequired,
    next: PropTypes.string,
    previous: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      service: PropTypes.number,
      event: PropTypes.number,
      percent: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  services: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  onDelete: PropTypes.func.isRequired // Add validation for onDelete
};

export default DiscountDetails;
