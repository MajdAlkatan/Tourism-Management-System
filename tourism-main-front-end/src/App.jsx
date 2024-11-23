import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './sections/Header/Header';
import NavBar from './sections/NavBar/NavBar';
import Footer from './sections/Footer/Footer';
import Container from './sections/Container/Container';
import Container2 from './sections/Container2/Container2';
import Hotel_Dashboard from './Pages/Hotel/Hotel_Dashboard/Hotel_Dashboard';
import Add_Hotel from './Pages/Hotel/Add_Hotel/Add_Hotel';
import Home from './Pages/Home/Home';
import Hotel_Page from './Pages/Hotel/Hotel-Page/Hotel-Page';
import Add_Room from './Pages/Hotel/Add_Room/Add_Room';
import Activities from './Pages/Activities/Activities_dashboard/Activities';
import Car_rental from './Pages/Cars/Car_Dashboard/Car_rental';
import Add_Car from './Pages/Cars/Add_Car/Add_Car';
import Add_Site from './Pages/Activities/Add_Site/Add_Site';
import Add_Trip from './Pages/Activities/Add_Trip/Add_Trip';
import Site from './Pages/Activities/Site/Site';
import Userpage from './Pages/Userpage/Userpage';
import Login from './Pages/Login/Login';
import Guidspage from './Pages/Guid/Guidspage';
import Add_Guid from './Pages/Guid/addguid/guid';
import GuidDetailsPage from './Pages/Guid/GuidsDetailse';
import EventsDash from './Pages/Events/EventsDash';
import AddEvent from './Pages/Events/AddEvent/AddEvent';
import UserDetailPage from './Pages/Userpage/UserDetailPage';
import Profile from './Pages/Profile/Profile';
import ProfileDialoge from './Pages/Profile/ProfileDialoge';
import Services from './Pages/Services/Services';
import Category from './Pages/Services/Tags/Category/Category';
import Tags from './Pages/Services/Tags/Tags';
import DeleteDialog from './Pages/Delete/DeleteDialog';
import Tour from './Pages/Activities/Tour/Tour';
import AddSites from './Pages/Activities/Tour/AddSites';
import Ticket from './Pages/Ticket/Ticket';
import EditSite from './Pages/Activities/Site/EditSite';
import AddTags from './Pages/Activities/Tour/Add_tags';
import FavouritPage from './Pages/Activities/Tour/Favourit';
import Discountpage from './Pages/Discount/Discountpage';
import MakeDiscount from './Pages/Discount/MakeDiscount/Makedicount';
import SearchFilters from './Pages/Search/Search';
import Listing from './Pages/Activities/Listing/Listings';
import Roompage from './Pages/Hotel/Room/RoomPage/Roompage';
import AddTagPage from './Pages/Hotel/Add_Tag/AddTagDialog';
import Update_Hotel from './Pages/Hotel/Update_Hotel/Update_hotel';
import AddTagsRoom from './Pages/Hotel/Room/RoomPage/AddTagsRomm';
import Notification from './Pages/Notification/notification';
import ForgetPassowrd from './Pages/Login/ForgetPassowrd';
import Add_Bed from './Pages/Hotel/Room/BedPage/Add_Bed';
import   useNotifications  from './Pages/Notification/useNotifications';
// config.js
export const baseurl = `http://127.0.0.1:8000/`;

import './App.css';
function App() {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const hotelsData = useSelector((state) => state.hotel.data);

  
    useNotifications();
 

  return (
    <Router>
      {isAuthenticated ? (
        <div>
          <Header />
          <Container>
            <NavBar />
            <Container2>
              <Routes>
                <Route path="/home-Page" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/hotel-dashboad" element={<Hotel_Dashboard />} />
                <Route path="/room_page/:id" element={<Roompage />} />
                <Route path="/add-hotel" element={<Add_Hotel />} />
                <Route path="/update-hotel/:id" element={<Update_Hotel />} />
                <Route path="/add-bed/:id" element={<Add_Bed />} />
                <Route path="/hotel-page/:id" element={<Hotel_Page hotels={hotelsData} />} />
                <Route path="/add-room" element={<Add_Room />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/Site/:id" element={<Site />} />
                <Route path="/CarRental_dashboard" element={<Car_rental />} />
                <Route path="/add_car" element={<Add_Car />} />
                <Route path="/add_site" element={<Add_Site />} />
                <Route path="/add_trip" element={<Add_Trip />} />
                <Route path="/Add_Guid" element={<Add_Guid />} />
                <Route path="/Edit_profile" element={<ProfileDialoge />} />
                <Route path="/services" element={<Services />} />
                <Route path="/add_category" element={<Category />} />
                <Route path="/add_tag" element={<Tags />} />
                <Route path="/delete/:id" element={<DeleteDialog />} />
                <Route path="/tour/:id" element={<Tour />} />
                <Route path="/tour/:id/addSites" element={<AddSites />} />
                <Route path="/tour/:id/add-ticket" element={<Ticket />} />
                <Route path="/Site/:id/EditSite/:id" element={<EditSite />} />
                <Route path="/tour/:id/add_tags/:id" element={<AddTags />} />
                <Route path="/tour/:id/favourit" element={<FavouritPage />} />
                <Route path="/Site/:id/Listing" element={<Listing />} />
                <Route path="/search" element={<SearchFilters />} />
                <Route path="/MakeDiscount" element={<MakeDiscount />} />
                <Route path="/Discountpage" element={<Discountpage />} />
                <Route path="/UserProfile" element={<Userpage />} />
                <Route path="/Guidspage" element={<Guidspage />} />
                <Route path="/guid/:id" element={<GuidDetailsPage />} />
                <Route path="/EventDash" element={<EventsDash />} />
                <Route path="/Add_Event" element={<AddEvent />} />
                <Route path="/user/:id" element={<UserDetailPage />} />
                <Route path="/add-tag" element={<AddTagPage />} />
                <Route path="/add_tag_room/:id" element={<AddTagsRoom />} />
                <Route path="/not" element={<Notification/>} />

                <Route path="*" element={<Navigate to="/home-Page" />} />
              </Routes>
            </Container2>
          </Container>
          <Footer />
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-passowrd" element={<ForgetPassowrd />} />

        </Routes>
      )}
    </Router>
  );
}

export default App;
