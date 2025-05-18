import React, { useEffect } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center" data-aos="fade-up">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Have questions about our Indian travel experiences? We're here to help!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div data-aos="fade-right">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
              >
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="space-y-8" data-aos="fade-left">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-black mt-1" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600">+91 99400 47463</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-black mt-1" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">luxorholidayhomestays@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-black mt-1" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600">40/2B Kovalam main road, Chennai, 603112</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-6 text-center">Find Us on the Map</h2>
          <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
            <iframe
              title="Coimbatore Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125323.40216323!2d76.89010037974042!3d11.011870079525526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1673429729105!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

