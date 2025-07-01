import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
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
    
    const navigate = useNavigate();
    const location = useLocation();
    const { authToken, userData, logout } = useAuth();
    const isSignedIn = !!authToken;
    
    // Check if the current user is admin
    const isAdmin = isSignedIn && userData && userData.email === 'adminluxor331';

    // Function to handle navigation with proper scroll behavior
    const handleNavigation = (path) => {
        // Only perform actions if path is different from current location
        if (path !== location.pathname) {
            // First scroll to top immediately
            window.scrollTo(0, 0);
            
            // Then navigate to the new route
            navigate(path);
            
            // Close mobile menu if open
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        }
    }

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

    // Custom login handler
    const handleLogin = () => {
        navigate('/sign-in');
    };

    // User menu controls
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
            isScrolled 
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" 
            : "bg-white/20 backdrop-blur-sm py-4 md:py-6"
        }`}>
            {/* Logo with text */}
            <div className="flex items-center gap-3">
                {/* Use handleNavigation instead of Link */}
                <div 
                    onClick={() => handleNavigation('/')} 
                    className="flex items-center gap-3 cursor-pointer relative z-10"
                >
                    <img src={assets.logo} alt="logo" className="h-20" />
                    <h1 className={`text-3xl ml-2 font-bold font-playfair ${
                        isScrolled ? "text-gray-800" : "text-gray-800 drop-shadow-sm"
                    }`}>
                        Luxor Holiday Home Stays
                    </h1>
                </div>
            </div>

            {/* Desktop Nav - Updated to show Dashboard only for admin */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8 relative z-10">
                {navLinks.map((link, i) => (
                    <div 
                        key={i} 
                        onClick={() => handleNavigation(link.path)} 
                        className={`group flex flex-col gap-0.5 ${
                            isScrolled 
                            ? "text-gray-700" 
                            : "text-gray-800 hover:text-black"
                        } cursor-pointer relative z-10 font-medium`}
                    >
                        {link.name}
                        <div className={`${
                            isScrolled ? "bg-gray-700" : "bg-black"
                        } h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </div>
                ))}
                {isSignedIn && userData && (
                    <div 
                        onClick={() => handleNavigation('/my-bookings')}
                        className={`group flex flex-col gap-0.5 ${
                            isScrolled 
                            ? "text-gray-700" 
                            : "text-gray-800 hover:text-black"
                        } cursor-pointer relative z-10 font-medium`}
                    >
                        My Bookings
                        <div className={`${
                            isScrolled ? "bg-gray-700" : "bg-black"
                        } h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </div>
                )}
                
                {/* Only show Dashboard button for admin */}
                {isAdmin && (
                    <button 
                        className={`border px-4 py-1 text-sm font-medium rounded-full cursor-pointer ${
                            isScrolled 
                            ? 'text-black border-black hover:bg-black hover:text-white' 
                            : 'text-black border-black hover:bg-black hover:text-white'
                        } transition-all relative z-10`} 
                        onClick={() => handleNavigation('/owner')}
                    >
                        Dashboard
                    </button>
                )}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4 relative z-10">
                <img 
                    src={assets.searchIcon} 
                    alt="search" 
                    className="h-7 transition-all duration-500 cursor-pointer hover:scale-110 invert" 
                />
                
                {isSignedIn && userData ? (
                    <div className="relative">
                        <div 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-emerald-500 overflow-hidden flex items-center justify-center">
                                {userData.profileImageUrl ? (
                                    <img src={userData.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-emerald-600 font-bold text-lg">
                                        {userData.firstName ? userData.firstName.charAt(0).toUpperCase() : 
                                         userData.name ? userData.name.charAt(0).toUpperCase() : 
                                         userData.email ? userData.email.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                )}
                            </div>
                            <span className="hidden lg:block text-sm font-medium">{userData.firstName || userData.name || userData.email}</span>
                        </div>
                        
                        {userMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                                <div 
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                    onClick={() => {
                                        setUserMenuOpen(false);
                                        handleNavigation('/my-bookings');
                                    }}
                                >
                                    <BookIcon />
                                    <span>My Bookings</span>
                                </div>
                                <div 
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                    onClick={() => {
                                        setUserMenuOpen(false);
                                        handleNavigation('/profile');
                                    }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>My Profile</span>
                                </div>
                                <hr className="my-1" />
                                <div 
                                    className="px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer flex items-center gap-2"
                                    onClick={() => {
                                        setUserMenuOpen(false);
                                        handleLogout();
                                    }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Logout</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button 
                        onClick={handleLogin} 
                        className="bg-black text-white hover:bg-gray-800 px-8 py-2.5 rounded-full ml-4 transition-all duration-300 shadow-md"
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden relative z-10">
                {isSignedIn && userData && (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-500 overflow-hidden flex items-center justify-center"
                         onClick={() => setUserMenuOpen(!userMenuOpen)}>
                        {userData.profileImageUrl ? (
                            <img src={userData.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-emerald-600 font-bold text-sm">
                                {userData.firstName ? userData.firstName.charAt(0).toUpperCase() : 
                                 userData.name ? userData.name.charAt(0).toUpperCase() : 
                                 userData.email ? userData.email.charAt(0).toUpperCase() : 'U'}
                            </div>
                        )}
                    </div>
                )}

                <img 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    src={assets.menuIcon} 
                    alt="" 
                    className="h-4 cursor-pointer invert" 
                />
            </div>

            {/* Mobile Menu - Updated to show Dashboard only for admin */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-md text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 z-50 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
                </button>

                {navLinks.map((link, i) => (
                    <div 
                        key={i} 
                        onClick={() => handleNavigation(link.path)}
                        className="cursor-pointer text-lg hover:text-black hover:font-bold transition-all"
                    >
                        {link.name}
                    </div>
                ))}

                {isSignedIn && userData && (
                    <div
                        onClick={() => handleNavigation('/my-bookings')}
                        className="cursor-pointer text-lg hover:text-black hover:font-bold transition-all"
                    >
                        My Bookings
                    </div>
                )}

                {/* Only show Dashboard button for admin in mobile menu */}
                {isAdmin && (
                    <button 
                        className="border px-6 py-2 text-sm font-medium rounded-full cursor-pointer hover:bg-black hover:text-white transition-all mt-4" 
                        onClick={() => handleNavigation('/owner')}
                    >
                        Dashboard
                    </button>
                )}

                {isSignedIn && userData ? (
                    <button 
                        onClick={handleLogout}
                        className="bg-red-600 text-white hover:bg-red-700 px-8 py-2.5 rounded-full transition-all duration-300 mt-4 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                ) : (
                    <button 
                        onClick={() => {
                            handleLogin();
                            setIsMenuOpen(false);
                        }} 
                        className="bg-black text-white hover:bg-gray-800 px-8 py-2.5 rounded-full transition-all duration-300 mt-4"
                    >
                        Login
                    </button>
                )}
            </div>
            
            {/* Mobile User Menu */}
            {userMenuOpen && isSignedIn && userData && (
                <div className="md:hidden fixed top-16 right-4 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                            setUserMenuOpen(false);
                            handleNavigation('/my-bookings');
                        }}
                    >
                        <BookIcon />
                        <span>My Bookings</span>
                    </div>
                    <div 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                            setUserMenuOpen(false);
                            handleNavigation('/profile');
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>My Profile</span>
                    </div>
                    <hr className="my-1" />
                    <div 
                        className="px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                            setUserMenuOpen(false);
                            handleLogout();
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;