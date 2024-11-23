// Discountpage.js
import "./Discountpage.css";
import Head1 from "../../Components/Head/Head1";
import discount from "../../assets/discount.svg";
import { useNavigate } from 'react-router-dom';
import DiscountDetails from '../../Components/DiscountDetails/DiscountDetails';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseurl } from '../../App';

function Discountpage() {
    const [discountData, setDiscountData] = useState(null);
    const [services, setServices] = useState([]);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const goToMakeDiscount = () => {
        navigate('/MakeDiscount');
    };

    useEffect(() => {
        const fetchDiscountData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `JWT ${token}`,
                };

                const [discountResponse, servicesResponse, eventsResponse] = await Promise.all([
                    axios.get(`${baseurl}/services/service-discounts/`, { headers }),
                    axios.get(`${baseurl}/services/activities/listings/`),
                    axios.get(`${baseurl}/events/`)
                ]);

                setDiscountData(discountResponse.data);
                setServices(servicesResponse.data.results || []);
                setEvents(eventsResponse.data.results || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDiscountData();
    }, []);

    const handleDelete = async (discountId) => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `JWT ${token}`,
            };
            // Make an API call to delete the discount
            await axios.delete(`${baseurl}/services/service-discounts/${discountId}/`, { headers });
            // Update the local state to remove the deleted discount
            setDiscountData(prevData => ({
                ...prevData,
                results: prevData.results.filter(discount => discount.id !== discountId)
            }));
        } catch (error) {
            console.error('Error deleting discount:', error);
        }
    };

    return (
        <div>
            <Head1
                Title="Make, Delete, and Manage Your Discounts"
                subTitle="Here’s what’s going on at your business right now"
                image={discount}
                titleButton1="Make Discount"
                onClickNavigation={goToMakeDiscount}
            />
            {discountData ? (
                <DiscountDetails 
                    discountData={discountData} 
                    services={services} 
                    events={events} 
                    onDelete={handleDelete} 
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Discountpage;
