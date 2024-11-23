import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addBed, resetState } from './AddBedSlice';
import DeleteButton from '../../../../Components/DetleteButton/DeleteButton2/DeleteButton2'; // Import the DeleteButton component
import './Add_Bed.css';
import { baseurl } from '../../../../App';

function Add_Bed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, bed, error } = useSelector((state) => state.addBed);
    const [bedType, setBedType] = useState('');
    const [bedNumber, setBedNumber] = useState('');
    const [beds, setBeds] = useState([]);

    useEffect(() => {
        const fetchBeds = async () => {
            try {
                const response = await axios.get(`${baseurl}/services/properties/sup-property-beds/?supProperty=${id}`);
                setBeds(response.data.results);
            } catch (error) {
                console.error('Error fetching beds:', error);
            }
        };

        fetchBeds();
    }, [id, bed]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBed({ supPropertyId: id, bedType, number: bedNumber }));
    };

    const handleDelete = async (bedId) => {
        try {
            await axios.delete(`${baseurl}/services/properties/sup-property-beds/${bedId}/`);
            // Remove the deleted bed from the state
            setBeds(beds.filter(b => b.id !== bedId));
        } catch (error) {
            console.error('Error deleting bed:', error);
        }
    };

    useEffect(() => {
        if (bed) {
            dispatch(resetState());
            setBedType('');
            setBedNumber('');
        }
    }, [bed, dispatch]);

    return (
        <div className="add-bed-container">
            <div className="form-container">
                <h2>Add Bed</h2>
                <form onSubmit={handleSubmit}>
                    <div className="select-container">
                        <label>
                            Bed Type:
                            <select value={bedType} onChange={(e) => setBedType(e.target.value)} required>
                                <option value="">Select Bed Type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="King">King</option>
                                <option value="Children">Children</option>
                                <option value="DoubleChildren">Double Children</option>
                            </select>
                        </label>
                    </div>
                    <label>
                        Number of Beds:
                        <input 
                            type="number" 
                            value={bedNumber}
                            onChange={(e) => setBedNumber(e.target.value)} 
                            required 
                            className='numberbutton'
                        />
                    </label>
                    <button type="submit" disabled={loading} className='addbedbutton'>
                        {loading ? 'Adding...' : 'Add Bed'}
                    </button>
                </form>
                {bed && <p>Bed added successfully!</p>}
                {error && <p>Error: {error}</p>}
            </div>

            <div className="beds-table-container">
                <h3>Existing Beds</h3>
                {beds.length > 0 ? (
                    <table className="bed-details-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Number</th>
                                <th>Capacity</th>
                                <th>Created</th>
                                <th>Modified</th>
                                <th>Actions</th> {/* Add a header for actions */}
                            </tr>
                        </thead>
                        <tbody>
                            {beds.map((bed) => (
                                <tr key={bed.id}>
                                    <td>{bed.type}</td>
                                    <td>{bed.number}</td>
                                    <td>{bed.capacity}</td>
                                    <td>{new Date(bed.created).toLocaleString()}</td>
                                    <td>{new Date(bed.modified).toLocaleString()}</td>
                                    <td>
                                        <DeleteButton onClick={() => handleDelete(bed.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No beds available for this room.</p>
                )}
            </div>
        </div>
    );
}

export default Add_Bed;
