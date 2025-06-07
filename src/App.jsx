import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar'
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import { FaWhatsapp } from 'react-icons/fa';
import Contact from './pages/Contact'
import Partners from './components/Footer/Partners'
import About from './components/Footer/About'
// import canceloption from "./components/Footer/Cancel-option"
import HelpCenter from './components/Footer/Help-center'
import Safety from './components/Footer/safety-info'
// import Accessibility from '@/components/Footer/Accessibility'
import Gallery from './components/Navbar/Gallery'
import SearchResults from './pages/SearchResults';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  
  const isOwnerPath = useLocation().pathname.includes("owner");
  
  return (
    <AuthProvider>
      <div>
        {!isOwnerPath && <Navbar />}
        <div className='min-h-[70vh]'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/rooms' element={<AllRooms/>} />
            <Route path='/rooms/:id' element={<RoomDetails/>} />
            <Route path='/search-results' element={<SearchResults/>} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/partners' element={<Partners />} />
            <Route path='/h' element={<HelpCenter />} />
            <Route path='/si' element={<Safety/>} />
            <Route path='/g' element={<Gallery/>} />
            <Route path='about' element={<About />} />
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

