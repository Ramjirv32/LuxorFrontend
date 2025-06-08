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

    // Handle user authentication with Clerk and backend
    useEffect(() => {
        const syncUserWithBackend = async () => {
            if (isSignedIn && user) {
                try {
                    console.log("Syncing user with backend:", user.id);
                    
                    // Get user email directly from Clerk
                    const userEmail = user.primaryEmailAddress?.emailAddress;
                    
                    if (!userEmail) {
                        console.error("No email found in Clerk user data");
                        return;
                    }
                    
                    // Store user email immediately
                    localStorage.setItem('userEmail', userEmail);
                    
                    // Get user details from Clerk
                    const userData = {
                        email: userEmail,
                        firstName: user.firstName || '',
                        lastName: user.lastName || '',
                        clerkId: user.id,
                        profileImageUrl: user.imageUrl || '',
                        phoneNumber: user.phoneNumbers?.[0]?.phoneNumber || ''
                    };

                    console.log("User data being sent to backend:", userData);

                    // Use fetch instead of axios for consistency
                    const response = await fetch(`${API_BASE_URL}/api/auth/clerk-sync`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });
                    
                    if (!response.ok) {
                        throw new Error(`Backend returned ${response.status}: ${await response.text()}`);
                    }
                    
                    const data = await response.json();
                    
                    if (data.token && data.user) {
                        localStorage.setItem('authToken', data.token);
                        localStorage.setItem('userId', data.user.id || data.user._id);
                        localStorage.setItem('userEmail', data.user.email);
                        
                        setAuthToken(data.token);
                        setUserData({
                            ...data.user,
                            _id: data.user._id || data.user.id,
                            id: data.user.id || data.user._id,
                            email: data.user.email
                        });
                    }
                } catch (error) {
                    console.error('Error syncing user with backend:', error);
                    
                    // Use basic user data from Clerk as fallback
                    if (user?.primaryEmailAddress?.emailAddress) {
                        const email = user.primaryEmailAddress.emailAddress;
                        localStorage.setItem('userEmail', email);
                        
                        setUserData({
                            id: user.id,
                            _id: user.id,
                            email: email,
                            firstName: user.firstName || '',
                            lastName: user.lastName || '',
                            profileImageUrl: user.imageUrl || ''
                        });
                    }
                }
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

            {/* Desktop Nav - Updated with handleNavigation and black text */}
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
                {isSignedIn && user && (
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
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4 relative z-10">
                <img 
                    src={assets.searchIcon} 
                    alt="search" 
                    className="h-7 transition-all duration-500 cursor-pointer hover:scale-110 invert" 
                />
                
                {isSignedIn && user ? (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action 
                                label="My Bookings" 
                                labelIcon={<BookIcon/>} 
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    navigate('/my-bookings');
                                }}
                            />
                            <UserButton.Action 
                                label="My Profile" 
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    navigate('/profile');
                                }}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
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
                {isSignedIn && user && (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action 
                                label="My Bookings" 
                                labelIcon={<BookIcon/>} 
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    navigate('/my-bookings');
                                }}
                            />
                            <UserButton.Action 
                                label="My Profile" 
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    navigate('/profile');
                                }}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                )}

                <img 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    src={assets.menuIcon} 
                    alt="" 
                    className="h-4 cursor-pointer invert" 
                />
            </div>

            {/* Mobile Menu - Updated with handleNavigation */}
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

                {isSignedIn && user && (
                    <div
                        onClick={() => handleNavigation('/my-bookings')}
                        className="cursor-pointer text-lg hover:text-black hover:font-bold transition-all"
                    >
                        My Bookings
                    </div>
                )}

                <button 
                    className="border px-6 py-2 text-sm font-medium rounded-full cursor-pointer hover:bg-black hover:text-white transition-all mt-4" 
                    onClick={() => handleNavigation('/owner')}
                >
                    Dashboard
                </button>

                {!isSignedIn && (
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
        </nav>
    );
}

export default Navbar;