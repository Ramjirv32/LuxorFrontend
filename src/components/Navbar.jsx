import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";

const BookIcon = () => (
  <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
  </svg>
);

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Villas', path: '/rooms' },
        { name: 'Contact', path: '/contact' },
        { name: 'About', path: '/about' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const { openSignIn } = useClerk();
    const { isLoaded, isSignedIn, user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthToken, setUserData } = useAuth();

    useEffect(() => {
        if (location.pathname !== '/') {
            setIsScrolled(true);
            return;
        } else {
            setIsScrolled(false);
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    // Handle user authentication with Clerk and backend
    useEffect(() => {
        const syncUserWithBackend = async () => {
            if (isSignedIn && user) {
                try {
                    console.log("Syncing user with backend:", user.id);
                    
                    // Get user details from Clerk
                    const userData = {
                        email: user.primaryEmailAddress?.emailAddress,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        clerkId: user.id,
                        profileImageUrl: user.imageUrl,
                        // Add any additional fields you need
                        phoneNumber: user.phoneNumbers?.[0]?.phoneNumber
                    };

                    // Send to our backend
                    const response = await axios.post(`${API_BASE_URL}/api/auth/clerk-sync`, userData);
                    
                    if (response.data.token) {
                        // Store JWT token and user info in localStorage
                        localStorage.setItem('authToken', response.data.token);
                        localStorage.setItem('userEmail', userData.email);
                        localStorage.setItem('userId', response.data.user.id);
                        
                        // Update context
                        setAuthToken(response.data.token);
                        setUserData(response.data.user);

                        console.log('User synced with backend successfully');
                    }
                } catch (error) {
                    console.error('Error syncing user with backend:', error);
                }
            } else if (isLoaded && !isSignedIn) {
                // User logged out, clear local storage
                localStorage.removeItem('authToken');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userId');
                setAuthToken(null);
                setUserData(null);
            }
        };

        // Only run this effect when isLoaded is true (to avoid premature logout)
        if (isLoaded) {
            syncUserWithBackend();
        }
    }, [isLoaded, isSignedIn, user, setAuthToken, setUserData]);

    // Custom login handler
    const handleLogin = () => {
        openSignIn({
            afterSignInUrl: window.location.href, // Redirect back to current page
            redirectUrl: window.location.href
        });
    };

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>
            {/* Logo with text */}
            <div className="flex items-center gap-3">
                <Link to='/' className="flex items-center gap-3">
                    <img src={assets.logo} alt="logo" className={`h-20 ${isScrolled && ""}`} />
                    <h1 className={`text-3xl ml-2 font-bold font-playfair ${isScrolled ? "text-gray-800" : "text-white"}`}>
                        Luxor Holiday Home Stays
                    </h1>
                </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </a>
                ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4">
                <img src={assets.searchIcon} alt="search" className={`${isScrolled && 'invert'} h-7 transition-all duration-500`} />
                
                {isSignedIn && user ? (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" labelIcon={<BookIcon/>} onClick={() => navigate('/my-bookings')}/>
                            <UserButton.Action label="My Profile" onClick={() => navigate('/profile')}/>
                        </UserButton.MenuItems>
                    </UserButton>
                ) : (
                    <button 
                        onClick={handleLogin} 
                        className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                {isSignedIn && user && (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" labelIcon={<BookIcon/>} onClick={() => navigate('/my-bookings')}/>
                            <UserButton.Action label="My Profile" onClick={() => navigate('/profile')}/>
                        </UserButton.MenuItems>
                    </UserButton>
                )}

                <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="" className={`${isScrolled && 'invert'} h-4`} />
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
                </button>

                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </a>
                ))}

                {!isSignedIn && (
                    <button 
                        onClick={() => {
                            handleLogin();
                            setIsMenuOpen(false);
                        }} 
                        className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;