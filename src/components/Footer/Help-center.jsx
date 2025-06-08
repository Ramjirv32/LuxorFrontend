import React, { useState, useEffect, useRef } from 'react';
import { Search, MessageCircle, X, Send, HelpCircle, Book, Video, MapPin } from 'lucide-react';

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m your villa booking assistant. How can I help you today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const messagesEndRef = useRef(null);
  
  // Define the faqs array
  const faqs = [
    {
      id: 1,
      question: "How do I book a villa?",
      answer: "Booking a villa is simple. Browse our selection, select your dates, and complete the booking form. Our team will confirm availability and guide you through the payment process."
    },
    {
      id: 2,
      question: "What is your cancellation policy?",
      answer: "Our standard cancellation policy allows for a full refund if cancelled 60 days before check-in. Cancellations 30-60 days prior receive a 50% refund. Cancellations less than 30 days before arrival are non-refundable. Some properties may have special policies."
    },
    {
      id: 3,
      question: "Is there a security deposit required?",
      answer: "Yes, most villas require a security deposit, typically 20-30% of the total booking amount. This is fully refundable within 7 days after checkout, provided there's no damage to the property."
    },
    {
      id: 4,
      question: "Are pets allowed in your villas?",
      answer: "Pet policies vary by property. Some villas welcome pets, while others do not. Please check the specific villa listing for pet information or contact our team for assistance."
    },
    {
      id: 5,
      question: "Can I request additional services?",
      answer: "Absolutely! We offer various additional services including airport transfers, private chefs, grocery delivery, childcare, and more. These can be arranged during booking or after confirmation."
    }
  ];
  
  // Villa-specific chatbot questions
  const chatbotQuestions = [
    {
      id: 1,
      question: "What types of villas do you offer?",
      answer: "We offer a wide range of villas including beachfront properties, mountain retreats, countryside estates, and luxury urban villas. Our collection includes traditional and modern architectural styles with various amenities."
    },
    {
      id: 2,
      question: "How do I choose the right villa size for my group?",
      answer: "We recommend selecting villas with at least one bedroom per couple, plus additional rooms for children or single travelers. Our listings clearly indicate maximum occupancy, and many villas offer multiple common spaces for gathering."
    },
    {
      id: 3,
      question: "Are your villas family-friendly?",
      answer: "Yes! Many of our villas are perfect for families. Look for properties with features like fenced pools, game rooms, multiple bedrooms, child-safe areas, and proximity to family attractions. You can filter for 'family-friendly' when searching."
    },
    {
      id: 4,
      question: "Do villas come with private pools?",
      answer: "Most of our luxury villas feature private pools. You can filter specifically for properties with pools, and further refine by heated pools, infinity pools, or child-safe options depending on your preferences."
    },
    {
      id: 5,
      question: "What kind of views can I expect from your villas?",
      answer: "Our villas offer stunning views ranging from ocean panoramas and mountain vistas to lush gardens and city skylines. Each property listing includes photos and descriptions of the views available."
    },
    {
      id: 6,
      question: "Are there staff available at the villas?",
      answer: "Staffing varies by property. Some villas come with full-time staff including housekeepers, chefs, and property managers, while others offer these services optionally. Check the individual villa description for staffing details."
    },
    {
      id: 7,
      question: "Do you have villas in remote/secluded areas?",
      answer: "Yes, we have many properties in secluded locations for guests seeking privacy and tranquility. These range from island retreats to mountain escapes and countryside properties set on private land."
    },
    {
      id: 8,
      question: "What's the average price range for villas?",
      answer: "Our villas range from ₹25,000 to ₹5,00,000 per night depending on location, size, amenities, and season. We offer options for various budgets while maintaining high standards of quality and comfort."
    },
    {
      id: 9,
      question: "Are there seasonal specials or discounts?",
      answer: "Yes, we regularly offer seasonal promotions and last-minute discounts. We also have special rates for extended stays (7+ nights) and returning guests. Sign up for our newsletter to receive notifications about our latest offers."
    },
    {
      id: 10,
      question: "Can I book a villa for events or weddings?",
      answer: "Selected villas in our collection are suitable for events and celebrations. These properties offer expansive grounds, reception areas, and can accommodate larger groups. Additional fees and special terms may apply for event bookings."
    }
  ];

  // Resources data
  const resources = [
    {
      title: "Booking Guide",
      description: "A comprehensive guide to booking your perfect villa, from searching to check-in.",
      icon: <Book className="w-5 h-5" />,
      link: "#",
      linkText: "Download PDF"
    },
    {
      title: "Destination Guides",
      description: "Explore our collection of destination guides to help plan your perfect villa vacation.",
      icon: <MapPin className="w-5 h-5" />,
      link: "#",
      linkText: "Browse Guides"
    },
    {
      title: "Travel Tips",
      description: "Expert advice and insider tips for making the most of your villa stay.",
      icon: <HelpCircle className="w-5 h-5" />,
      link: "#",
      linkText: "Read Tips"
    },
    {
      title: "Video Tutorials",
      description: "Watch our helpful video guides on booking, amenities, and more.",
      icon: <Video className="w-5 h-5" />,
      link: "#",
      linkText: "Watch Videos"
    }
  ];

  // Scroll to bottom of messages when new ones appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle FAQ search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFaqs(faqs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = faqs.filter(
        faq => faq.question.toLowerCase().includes(query) || 
              faq.answer.toLowerCase().includes(query)
      );
      setFilteredFaqs(filtered);
    }
  }, [searchQuery]);

  // Initialize filtered FAQs
  useEffect(() => {
    setFilteredFaqs(faqs);
  }, []);

  const handleQuestionClick = (id) => {
    const question = chatbotQuestions.find(q => q.id === id);
    
    // Add user question to chat
    setMessages(prev => [...prev, { sender: 'user', text: question.question }]);
    
    // Add bot response after a short delay to simulate thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: question.answer,
        isTyping: true
      }]);

      // After another delay, remove the typing indicator
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg === prev[prev.length - 1] ? { ...msg, isTyping: false } : msg
          )
        );
      }, 500);
    }, 500);
  };

  const handleUserMessageSubmit = (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
    
    // Find if the input matches any known questions
    const lowerInput = userInput.toLowerCase();
    const matchedQuestion = chatbotQuestions.find(q => 
      q.question.toLowerCase().includes(lowerInput)
    );
    
    // Clear input field
    setUserInput('');
    
    setTimeout(() => {
      if (matchedQuestion) {
        setMessages(prev => [...prev, { sender: 'bot', text: matchedQuestion.answer }]);
      } else {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: "I'm not sure I understand your question. Could you please select from one of the options below or try rephrasing your question?"
        }]);
      }
    }, 800);
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Header with subtle gradient */}
      <header className="pt-24 pb-16 bg-gradient-to-r from-amber-50 to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-100 opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-200 opacity-20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900">
            Help Center
          </h1>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            Find answers to common questions and get the support you need for your luxury villa booking.
          </p>
          
          {/* Search box - only visible for FAQ tab */}
          {activeTab === 'faq' && (
            <div className="max-w-xl mx-auto mt-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-4 pl-12 rounded-full border border-gray-300 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition-all"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Tabs - Enhanced with animations and better mobile experience */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-xl shadow-md flex flex-col sm:flex-row overflow-hidden">
          <button 
            className={`py-4 px-6 font-medium text-base sm:text-lg transition-all relative ${
              activeTab === 'faq' 
                ? 'text-amber-700 bg-amber-50 border-b-2 sm:border-b-0 sm:border-l-4 border-amber-500' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('faq')}
          >
            <span className="relative z-10">Frequently Asked Questions</span>
          </button>
      
          <button 
            className={`py-4 px-6 font-medium text-base sm:text-lg transition-all relative ${
              activeTab === 'resources' 
                ? 'text-amber-700 bg-amber-50 border-b-2 sm:border-b-0 sm:border-l-4 border-amber-500' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('resources')}
          >
            <span className="relative z-10">Resources</span>
          </button>
          
          <button 
            className={`py-4 px-6 font-medium text-base sm:text-lg transition-all relative ${
              activeTab === 'chatbot' 
                ? 'text-amber-700 bg-amber-50 border-b-2 sm:border-b-0 sm:border-l-4 border-amber-500' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('chatbot')}
          >
            <span className="relative z-10">
              <span className="flex items-center">
                Villa Assistant
                <MessageCircle className="ml-2 h-4 w-4" />
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Tab Content - Enhanced visual styling */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">
                  We couldn't find any FAQs matching your search. Try different keywords or 
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-amber-600 font-medium hover:underline ml-1"
                  >
                    view all FAQs
                  </button>.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div 
                    key={faq.id} 
                    className={`border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300 ${
                      expandedFaq === faq.id ? 'shadow-md' : 'hover:shadow-md'
                    }`}
                  >
                    <button 
                      className="flex justify-between items-center w-full p-6 text-left"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span className="font-medium text-lg text-gray-900">{faq.question}</span>
                      <span className={`text-2xl transition-transform duration-200 ${
                        expandedFaq === faq.id ? 'rotate-180 text-amber-500' : 'text-gray-400'
                      }`}>
                        ↓
                      </span>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedFaq === faq.id ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="p-6 pt-0 text-gray-700 border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((resource, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-amber-200 group"
                >
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-amber-50 text-amber-700 rounded-lg group-hover:bg-amber-100 transition-all duration-300">
                      {resource.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">{resource.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {resource.description}
                      </p>
                      <a 
                        href={resource.link} 
                        className="text-amber-600 font-medium hover:text-amber-700 inline-flex items-center group"
                      >
                        {resource.linkText}
                        <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-8 bg-gradient-to-r from-amber-50 to-gray-50 rounded-xl text-center">
              <h3 className="text-2xl font-semibold mb-4">Need More Help?</h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Our dedicated support team is available to help with any questions you may have about our luxury villas and booking process.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="mailto:support@luxorstay.com" 
                  className="px-6 py-3 bg-white text-amber-600 font-medium rounded-full border border-amber-200 hover:bg-amber-50 transition-colors duration-200"
                >
                  Email Support
                </a>
                <a 
                  href="tel:+918001234567" 
                  className="px-6 py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-colors duration-200"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Chatbot Tab - Enhanced with typing indicators and UI improvements */}
        {activeTab === 'chatbot' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-amber-50 to-gray-50 p-4 border-b border-gray-200">
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-amber-400 mr-2 animate-pulse"></div>
                  <h3 className="font-medium">Villa Assistant - Online</h3>
                </div>
              </div>
              
              {/* Chat messages - with better styling and animations */}
              <div className="p-4 h-96 overflow-y-auto bg-gray-50 scroll-smooth">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                      <div 
                        className={`p-3 rounded-2xl max-w-xs md:max-w-md shadow-sm ${
                          message.sender === 'user' 
                            ? 'bg-amber-600 text-white rounded-tr-none' 
                            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {message.text}
                        {message.isTyping && (
                          <div className="flex space-x-1 mt-1 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{animationDelay: '0ms'}}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{animationDelay: '150ms'}}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{animationDelay: '300ms'}}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Message input form */}
              <form 
                onSubmit={handleUserMessageSubmit}
                className="p-4 border-t border-gray-200 flex gap-2"
              >
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                />
                <button 
                  type="submit"
                  disabled={!userInput.trim()}
                  className={`p-2 rounded-full ${
                    userInput.trim() 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
              
              {/* Suggested Questions */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <p className="text-sm font-medium text-gray-500 mb-3">Popular questions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {chatbotQuestions.slice(0, 6).map(q => (
                    <button
                      key={q.id}
                      onClick={() => handleQuestionClick(q.id)}
                      className="text-left text-sm p-2.5 border border-gray-200 rounded-lg hover:bg-amber-50 hover:border-amber-200 transition-colors"
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-center">
                  <button 
                    className="text-amber-600 text-sm hover:underline"
                    onClick={() => setActiveTab('faq')}
                  >
                    View all FAQs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default HelpCenter;