import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar'
import {Route, Routes, useLocation, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import VillaDetails from './pages/VillaDetails'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import BookingDetails from './pages/BookingDetails';
import { FaWhatsapp } from 'react-icons/fa';
import Contact from './pages/Contact'
import Partners from './components/Footer/Partners'
import About from './components/Footer/About'
import HelpCenter from './components/Footer/Help-center'
import Safety from './components/Footer/safety-info'
import Gallery from './components/Navbar/Gallery'
import SearchResults from './pages/SearchResults';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignIn from './pages/SignIn';
import OTPVerification from './pages/OTPVerification';

// Auth Guard Component
const ProtectedRoute = ({ children }) => {
  const { authToken, loading } = useAuth();
  
  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!authToken) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return children;
};

const App = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  const isOwnerPath = pathname.includes("owner");
  
  return (
    <AuthProvider>
      <div>
        {!isOwnerPath && <Navbar />}
        <div className='min-h-[70vh]'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/rooms' element={<AllRooms/>} />
            <Route path='/rooms/:id' element={<RoomDetails/>} />
            <Route path='/villa/:id' element={<VillaDetails/>} />
            <Route path='/villas/:id' element={<VillaDetails/>} />
            <Route path='/search-results' element={<SearchResults/>} />
            <Route path='/my-bookings' element={
              <ProtectedRoute>
                <MyBookings/>
              </ProtectedRoute>
            } />
            <Route path='/booking/:id' element={<BookingDetails/>} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/partners' element={<Partners />} />
            <Route path='/h' element={<HelpCenter />} />
            <Route path='/si' element={<Safety/>} />
            <Route path='/g' element={<Gallery/>} />
            <Route path='about' element={<About />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
          </Routes>
        </div>
        <Footer />

        <a
          href="https://wa.me/7904040739?text=Hi%2C%20I%20am%20interested%20in%20booking%20a%20villas."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-50 text-2xl"
        >
          <FaWhatsapp />
        </a>
      </div>
    </AuthProvider>
  )
}

export default App;



