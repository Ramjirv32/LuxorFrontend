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

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.615a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,7.952,8.2l-.556.556a15.643,15.643,0,0,0,7.848,7.848l.556-.556a3.877,3.877,0,0,1,1.168-.826,2.094,2.094,0,0,1,2.328.445Z"/>
  </svg>
);

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Villas', path: '/rooms' },
        { name: 'Contact', path: '/contact' },
        { name: 'About', path: '/about' },
    ];
    
    // Contact information
    const contactInfo = {
        whatsapp: "+91 9876543210",
        phone: "+91 9876543210",
        displayPhone: "+91 987-654-3210" // Formatted display version
    };
    
    // Format phone number for URL
    const formatPhoneForWhatsApp = (phone) => {
        return phone.replace(/\s+/g, '').replace('+', '');
    };

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
            // First close mobile menu if open
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
            
            // Scroll to top and navigate
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => navigate(path), 100);
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
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 lg:px-12 xl:px-16 transition-all duration-500 z-50 ${
            isScrolled 
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-2 md:py-3" 
            : "bg-white/20 backdrop-blur-sm py-2 md:py-4"
        }`}>
            {/* Logo with text - more compact design */}
            <div className="flex items-center">
                {/* Use handleNavigation instead of Link */}
                <div 
                    onClick={() => handleNavigation('/')} 
                    className="flex items-center cursor-pointer relative z-10"
                >
                    <img src={assets.logo} alt="logo" className="h-16" />
                    <h1 className={`text-xl sm:text-2xl ml-1 font-bold font-playfair ${
                        isScrolled ? "text-gray-800" : "text-gray-800 drop-shadow-sm"
                    }`}>
                        Luxor Holiday Home Stays
                    </h1>
                </div>
            </div>

            {/* Desktop Nav - More compact design */}
            <div className="hidden md:flex items-center gap-2 lg:gap-5 relative z-10">
                {navLinks.map((link, i) => (
                    <div 
                        key={i} 
                        onClick={() => handleNavigation(link.path)} 
                        className={`group flex flex-col gap-0.5 ${
                            isScrolled 
                            ? "text-gray-700" 
                            : "text-gray-800 hover:text-black"
                        } cursor-pointer relative z-10 font-medium text-sm`}
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
                        } cursor-pointer relative z-10 font-medium text-sm`}
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
                        className={`border px-3 py-1 text-xs font-medium rounded-full cursor-pointer ${
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

            {/* Desktop Right - More compact design */}
            <div className="hidden md:flex items-center gap-2 relative z-10">
                {/* Contact Information with borders and spacing */}
                <div className="hidden lg:flex items-center pr-2 mr-2 border-r border-gray-300">
                    {/* WhatsApp Button with Green Border */}
                    <a 
                        href={`https://wa.me/${formatPhoneForWhatsApp(contactInfo.whatsapp)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-1 mr-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 border border-[#25D366]"
                        title="Contact us on WhatsApp"
                    >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span className="text-xs font-medium hidden xl:block">WhatsApp</span>
                    </a>
                    
                    {/* Phone Button with Yellow Border */}
                    <a 
                        href={`tel:${contactInfo.phone}`}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5F1E6] text-black shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 border border-[#D4AF37]"
                        title="Call us now"
                    >
                        <PhoneIcon className="w-4 h-4" />
                        <span className="text-xs font-medium hidden xl:inline-block">{contactInfo.displayPhone}</span>
                    </a>
                </div>
                
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
                        className="bg-black text-white hover:bg-gray-800 px-4 py-1.5 rounded-full ml-2 transition-all duration-300 shadow-sm text-xs"
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

                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="relative w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 overflow-hidden"
                    aria-label="Toggle menu"
                >
                    <img 
                        src={assets.menuIcon} 
                        alt="Menu" 
                        className={`h-4 invert transition-all duration-300 transform ${isMenuOpen ? 'rotate-180 scale-90' : ''}`}
                    />
                    <span className={`absolute inset-0 transition-all duration-500 ${isMenuOpen ? 'animate-ripple-effect bg-black/10' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu - Enhanced smooth animations and transitions */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-md text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ease-in-out z-50 ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"}`}>
                <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close-menu" className="h-6" />
                </button>

                {/* Enhanced animation container with staggered animations */}
                <div className={`w-full transition-all duration-500 ease-in-out ${isMenuOpen ? 'animate-fade-in' : ''}`}>
                    <div className="flex flex-col items-center gap-6 w-full">
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
                                className="border px-6 py-2 text-sm font-medium rounded-full cursor-pointer hover:bg-black hover:text-white transition-all mt-2" 
                                onClick={() => handleNavigation('/owner')}
                            >
                                Dashboard
                            </button>
                        )}
                        
                        {/* Enhanced Contact Options with borders */}
                        <div className="flex flex-col items-center mt-8 w-full px-6">
                            <p className="text-black font-playfair text-xl mb-6 font-medium">Contact Us</p>
                            
                            <div className="flex flex-col gap-4 w-full">
                                <a 
                                    href={`https://wa.me/${formatPhoneForWhatsApp(contactInfo.whatsapp)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 py-3.5 w-full rounded-lg bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 border-2 border-[#25D366]"
                                >
                                    <WhatsAppIcon className="w-6 h-6" />
                                    <span className="text-base font-medium">WhatsApp Us</span>
                                </a>
                                
                                <a 
                                    href={`tel:${contactInfo.phone}`}
                                    className="flex items-center justify-center gap-3 py-3.5 w-full rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5F1E6] text-black shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 border-2 border-[#D4AF37]"
                                >
                                    <PhoneIcon className="w-6 h-6" />
                                    <span className="text-base font-medium">Call Now</span>
                                </a>
                            </div>
                            
                            <p className="text-gray-600 mt-3 text-center text-sm">{contactInfo.displayPhone}</p>
                        </div>

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
                </div>
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

            {/* Enhanced smooth animation styles */}
            <style jsx>{`
                @keyframes rippleEffect {
                    0% { opacity: 0.3; transform: scale(0); }
                    50% { opacity: 0.2; }
                    100% { opacity: 0; transform: scale(2.5); }
                }
                
                @keyframes slideFromRight {
                    0% { opacity: 0; transform: translateX(20px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }

                .animate-ripple-effect {
                    animation: rippleEffect 1s ease-out forwards;
                }
                
                .animate-slide-from-right {
                    animation: slideFromRight 0.6s ease-in-out;
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-in-out;
                }
            `}</style>
        </nav>
    );
}

export default Navbar;