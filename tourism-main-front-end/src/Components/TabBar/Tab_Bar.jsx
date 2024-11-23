// TabBar.js
import PropTypes from 'prop-types';
import './Tab_Bar.css'; // Style the tab bar as needed

const TabBar = ({ selectedTab, onTabSelect }) => {
  return (
    <div className="tab-bar">
      <button 
        className={selectedTab === 'service' ? 'active' : ''} 
        onClick={() => onTabSelect('service')}
      >
        Service
      </button>
      <button 
        className={selectedTab === 'event' ? 'active' : ''} 
        onClick={() => onTabSelect('event')}
      >
        Event
      </button>
      <button 
        className={selectedTab === 'both' ? 'active' : ''} 
        onClick={() => onTabSelect('both')}
      >
        Both
      </button>
    </div>
  );
};

TabBar.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
};

export default TabBar;
