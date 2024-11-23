import { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Home.css';

const CurrencyStockTrends = () => {
  const [currencyData, setCurrencyData] = useState({});
  const [stockData, setStockData] = useState({ labels: [], prices: [] });

  useEffect(() => {
    // Fetch currency exchange rates data
    const fetchCurrency = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setCurrencyData(data);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    // Fetch stock market data
    const fetchStockData = async () => {
      try {
        const response = await fetch('https://api.twelvedata.com/time_series?symbol=AAPL&interval=1day&apikey=d5a66a9d2d5d459c80dc2c9efa43b803');
        const data = await response.json();
        if (data.values) {
          // Extract dates and closing prices from the response
          const stockLabels = data.values.map(entry => entry.datetime);
          const stockPrices = data.values.map(entry => parseFloat(entry.close));
          setStockData({ labels: stockLabels, prices: stockPrices });
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchCurrency();
    fetchStockData();
  }, []);

  // Process currency data for the chart
  const currencyList = currencyData.rates ? Object.entries(currencyData.rates).slice(0, 5) : [];
  const currencyChartData = {
    labels: currencyList.map(([currency]) => currency),
    datasets: [
      {
        label: 'Exchange Rates',
        data: currencyList.map(([, rate]) => rate),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Process stock market data for the chart
  const stockChartData = {
    labels: stockData.labels,
    datasets: [
      {
        label: 'Stock Prices',
        data: stockData.prices,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid-item currency-stock-trends">
      
      {/* Currency Data - Pie Chart */}
      <div className="currency-section">
        <h3>Currency Exchange Rates</h3>
        {currencyList.length > 0 ? (
          <Pie data={currencyChartData} />
        ) : (
          <p>Loading currency data...</p>
        )}
      </div>

      {/* Stock Market Data - Bar Chart */}
      <div className="stock-market-section">
        <h3>Stock Market Trends</h3>
        {stockData.labels.length > 0 && stockData.prices.length > 0 ? (
          <Bar data={stockChartData} />
        ) : (
          <p>Loading stock market data...</p>
        )}
      </div>
    </div>
  );
};

export default CurrencyStockTrends;
