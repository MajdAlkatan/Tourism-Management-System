import { useEffect, useState } from 'react';
import axios from 'axios';
import './Activities.css';
import { Statistics4, Statistics2, Statistics3, Statistics1, ActivitesPortfolio } from '../../../Components/index';
import Head33 from '../../../Components/Head/Head33';
import activity_imag from './../../../assets/activities.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ActivitesPage, ToursPage } from '../Activities_dashboard/Activites_Page';
import ActivitesPortfolio2 from '../../../Components/ActivitesPortfolio/ActivitesPortfolio2';
import { baseurl } from '../../../App';

function Activities() {
  const [statisticsData, setStatisticsData] = useState({
    series1: 0,
    series2: 0,
    series3: 0,
    series4: 0,
    series5: 0,
    series6: 0,
    px1: 2020,
    px2: 2021,
    px3: 2022,
    px4: 2023,
    px5: 2024,
    px6: 2025,
  });

  const [statistics2Data, setStatistics2Data] = useState({
    value1: 400,
    value2: 200,
    value3: 300,
    value4: 500,
    label1: 'Group A',
    label2: 'Group B',
    label3: 'Group C',
    label4: 'Group D',
  });

  const [statistics3Data, setStatistics3Data] = useState({
    a1: 2,
    a2: 3,
    a3: 4,
    a4: 1,
    a5: 2,
    b1: 4,
    b2: 4,
    b3: 2,
    b4: 1,
    b5: 2,
    c1: 5,
    c2: 6,
    c3: 3,
    c4: 7,
    c5: 1,
  });

  const Sites = useSelector((state) => state.activites.data.results);
  const Tours = useSelector((state) => state.activites.tours.results);

  let navigate = useNavigate();
  const goToAddTrip = () => {
    navigate('/add_trip');
  };
  const goToAddSite = () => {
    navigate('/add_site');
  };
  const goToSite = (id) => {
    navigate(`/Site/${id}`);
  };
  const goToTour = (id) => {
    navigate(`/tour/${id}`);
  };
  const goToSearch = () => {
    navigate('/search');
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ActivitesPage());
    dispatch(ToursPage());
  }, [dispatch]);

  // Fetch data for Statistics1 using axios
  useEffect(() => {
    axios.get(`${baseurl}/reports/monthly_income_last_year`, {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`, // Replace with your actual token key
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setStatisticsData({
          series1: response.data.series1 || 0,
          series2: response.data.series2 || 0,
          series3: response.data.series3 || 0,
          series4: response.data.series4 || 0,
          series5: response.data.series5 || 0,
          series6: response.data.series6 || 0,
          px1: response.data.px1 || 2020,
          px2: response.data.px2 || 2021,
          px3: response.data.px3 || 2022,
          px4: response.data.px4 || 2023,
          px5: response.data.px5 || 2024,
          px6: response.data.px6 || 2025,
        });
      })
      .catch((error) => console.error('Error fetching data for Statistics1:', error));
  }, []);

  // Fetch data for Statistics2 using axios
  useEffect(() => {
    axios.get(`${baseurl}/reports/yearly_income_by_section`, {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`, // Replace with your actual token key
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setStatistics2Data({
          value1: response.data.value1 || 400,
          value2: response.data.value2 || 200,
          value3: response.data.value3 || 300,
          value4: response.data.value4 || 500,
          label1: response.data.label1 || 'Group A',
          label2: response.data.label2 || 'Group B',
          label3: response.data.label3 || 'Group C',
          label4: response.data.label4 || 'Group D',
        });
      })
      .catch((error) => console.error('Error fetching data for Statistics2:', error));
  }, []);

  // Fetch data for Statistics3 using axios
  useEffect(() => {
    axios.get(`${baseurl}/reports/yearly_income_by_section_monthly`, {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`, // Replace with your actual token key
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setStatistics3Data({
          a1: response.data.a1 || 2,
          a2: response.data.a2 || 3,
          a3: response.data.a3 || 4,
          a4: response.data.a4 || 1,
          a5: response.data.a5 || 2,
          b1: response.data.b1 || 4,
          b2: response.data.b2 || 4,
          b3: response.data.b3 || 2,
          b4: response.data.b4 || 1,
          b5: response.data.b5 || 2,
          c1: response.data.c1 || 5,
          c2: response.data.c2 || 6,
          c3: response.data.c3 || 3,
          c4: response.data.c4 || 7,
          c5: response.data.c5 || 1,
        });
      })
      .catch((error) => console.error('Error fetching data for Statistics3:', error));
  }, []);

  return (
    <div className='acitivity'>
      <Head33
        image={activity_imag}
        Title='Hotels Dashboard'
        subTitle='Here’s what’s going on at your business right now'
        titleButton1='Add Trip'
        titleButton2='Add Site'
        titleButton3='Search'
        onClickNavigation2={goToAddSite}
        onClickNavigation={goToAddTrip}
        onClickNavigation3={goToSearch}
      />

      <span>Sites</span>
      <ActivitesPortfolio images={Sites} onClickNav={goToSite} />
      <span>Tours</span>
      <ActivitesPortfolio2 activities={Tours} onClickNav={goToTour} />

      <div className='statistics'>
        <Statistics1
          series1={statisticsData.series1}
          series2={statisticsData.series2}
          series3={statisticsData.series3}
          series4={statisticsData.series4}
          series5={statisticsData.series5}
          series6={statisticsData.series6}
          px1={statisticsData.px1}
          px2={statisticsData.px2}
          px3={statisticsData.px3}
          px4={statisticsData.px4}
          px5={statisticsData.px5}
          px6={statisticsData.px6}
        />
        <Statistics2
          value1={statistics2Data.value1}
          value2={statistics2Data.value2}
          value3={statistics2Data.value3}
          value4={statistics2Data.value4}
          label1={statistics2Data.label1}
          label2={statistics2Data.label2}
          label3={statistics2Data.label3}
          label4={statistics2Data.label4}
        />
        <Statistics3
          a1={statistics3Data.a1}
          a2={statistics3Data.a2}
          a3={statistics3Data.a3}
          a4={statistics3Data.a4}
          a5={statistics3Data.a5}
          b1={statistics3Data.b1}
          b2={statistics3Data.b2}
          b3={statistics3Data.b3}
          b4={statistics3Data.b4}
          b5={statistics3Data.b5}
          c1={statistics3Data.c1}
          c2={statistics3Data.c2}
          c3={statistics3Data.c3}
          c4={statistics3Data.c4}
          c5={statistics3Data.c5}
        />
        <Statistics4
          uv1={-15.69} uv2={-20.63} uv3={89.22} uv4={190.67} uv5={286.69} uv6={76.63} uv7={31.47}
        />
      </div>
    </div>
  );
}

export default Activities;
