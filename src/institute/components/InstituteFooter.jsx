import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, PhoneCall } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const InstituteFooter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  
  const isActive = (path) => location.pathname === path;
  const isCourseCategory = (cat) => location.pathname === '/courses' && category === cat;
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Vspaze</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering students with quality education and industry-relevant skills.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`text-gray-400 hover:text-white transition-colors ${isActive('/') ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={`text-gray-400 hover:text-white transition-colors ${isActive('/about') ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className={`text-gray-400 hover:text-white transition-colors ${isActive('/courses') ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/faculty" className={`text-gray-400 hover:text-white transition-colors ${isActive('/faculty') ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>
                  Faculty
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`text-gray-400 hover:text-white transition-colors ${isActive('/contact') ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses?category=Development" onClick={() => window.scrollTo(0, 0)} className={`text-gray-400 hover:text-white transition-colors ${isCourseCategory('Development') ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>
                  Full Stack Development
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Data Science" onClick={() => window.scrollTo(0, 0)} className={`text-gray-400 hover:text-white transition-colors ${isCourseCategory('Data Science') ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>
                  Data Science & AI
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Marketing" onClick={() => window.scrollTo(0, 0)} className={`text-gray-400 hover:text-white transition-colors ${isCourseCategory('Marketing') ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Cloud" onClick={() => window.scrollTo(0, 0)} className={`text-gray-400 hover:text-white transition-colors ${isCourseCategory('Cloud') ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>
                  Cloud Computing
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Development" onClick={() => window.scrollTo(0, 0)} className={`text-gray-400 hover:text-white transition-colors ${isCourseCategory('Development') ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>
                  Python Programming
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/certifications" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition-colors">
                  AWS Certified
                </Link>
              </li>
              <li>
                <Link to="/certifications" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition-colors">
                  Google Certified
                </Link>
              </li>
              <li>
                <Link to="/certifications" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition-colors">
                  Microsoft Certified
                </Link>
              </li>
              <li>
                <Link to="/certifications" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition-colors">
                  Industry Recognized
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Vspaze Institute, Tech Park, Bangalore, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneCall className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="tel:08012345678" className="text-gray-400 hover:text-white transition-colors">
                  080-1234-5678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="mailto:info@vspaze.com" className="text-gray-400 hover:text-white transition-colors">
                  info@vspaze.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-gray-400">
          <p>&copy; 2024 Vspaze Institute. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-all hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default InstituteFooter;
