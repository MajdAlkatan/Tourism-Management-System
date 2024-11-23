import './Car_rental.css'
import Head1 from '../../../Components/Head/Head1'
import { Portfolio, Statistics4, Statistics2, Statistics3, Statistics1 } from '../../../Components/index'
import { useNavigate } from 'react-router-dom'
import car_rental from './../../../assets/Car_rental.svg'
import { useState, useEffect } from 'react';
import axios from 'axios';


function Car_rental() {
    const [portfolioItems, setPortfolioItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/photos'); // Fetching photos
            // Slice the array to get only the first 5 items
            const firstFiveItems = response.data.slice(0, 100);
            setPortfolioItems(firstFiveItems);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    const navigate=useNavigate();
    const goToAddCar = () => {
        navigate('/add_car'); 
      };
    // Define an array of portfolio items

    return (
        <div>
            <Head1 
             image={car_rental}
             Title='Cars Dashboard' 
             subTitle='Here’s what’s going on at your business right now'
             titleButton1='Add Car'
             onClickNavigation={goToAddCar}
            
            />

            <Portfolio images={portfolioItems} onClickNav={'#ff'}  />
            <div className='statistics'>
                <Statistics1
                    series1={10}
                    series2={20}
                    series3={30}
                    series4={40}
                    series5={50}
                    series6={60}
                    px1={2}
                    px2={5.5}
                    px3={3}
                    px4={8.5}
                    px5={1.5}
                    px6={5}

                />
                <Statistics2
                    value1={400}
                    value2={200}
                    value3={300}
                    value4={500}
                    label1={'Group A'}
                    label2={'Group B'}
                    label3={'Group C'}
                    label4={'Group D'}
                />
                <Statistics3
                    a1={1}
                    a2={2}
                    a3={3}
                    a4={4}
                    a5={5}
                    b1={1}
                    b2={2}
                    b3={3}
                    b4={4}
                    b5={5}
                    c1={1}
                    c2={2}
                    c3={3}
                    c4={4}
                    c5={5}
                />
                <Statistics4
                    uv1={-15.69} uv2={-20.63} uv3={89.22} uv4={190.67} uv5={286.69} uv6={76.63} uv7={31.47}
                />       
                     </div>
        </div>
    )
}

export default Car_rental ;