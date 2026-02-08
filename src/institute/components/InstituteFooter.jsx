import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Printer, ArrowUp } from 'lucide-react';
import { TbDeviceLandlinePhone } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';

const InstituteFooter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  
  const isActive = (path) => location.pathname === path;
  const isCourseCategory = (cat) => location.pathname === '/courses' && category === cat;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border-2 border-white">
                <GraduationCap className="w-5 h-5 text-white" strokeWidth={2} />
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
                <Link to="/" className={`relative inline-block text-gray-400 hover:text-white transition-colors group ${isActive('/') ? 'text-white' : ''}`}>
                  Home
                  {isActive('/') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-draw-line"></span>}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/about" className={`relative inline-block text-gray-400 hover:text-white transition-colors group ${isActive('/about') ? 'text-white' : ''}`}>
                  About Us
                  {isActive('/about') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-draw-line"></span>}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className={`relative inline-block text-gray-400 hover:text-white transition-colors group ${isActive('/courses') ? 'text-white' : ''}`}>
                  Courses
                  {isActive('/courses') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-draw-line"></span>}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/faculty" className={`relative inline-block text-gray-400 hover:text-white transition-colors group ${isActive('/faculty') ? 'text-white' : ''}`}>
                  Faculty
                  {isActive('/faculty') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-draw-line"></span>}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`relative inline-block text-gray-400 hover:text-white transition-colors group ${isActive('/contact') ? 'text-white' : ''}`}>
                  Contact
                  {isActive('/contact') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-draw-line"></span>}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses?category=Development" onClick={() => window.scrollTo(0, 0)} className={`relative inline-block text-gray-400 hover:text-white transition-colors group ${isCourseCategory('Development') ? 'text-white' : ''}`}>
                  Full Stack Development
                  {isCourseCategory('Development') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-draw-line"></span>}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Data Science" onClick={() => window.scrollTo(0, 0)} className={`relative inline-block text-gray-400 hover:text-white transition-colors group ${isCourseCategory('Data Science') ? 'text-white' : ''}`}>
                  Data Science & AI
                  {isCourseCategory('Data Science') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-draw-line"></span>}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Marketing" onClick={() => window.scrollTo(0, 0)} className={`relative inline-block text-gray-400 hover:text-white transition-colors group ${isCourseCategory('Marketing') ? 'text-white' : ''}`}>
                  Digital Marketing
                  {isCourseCategory('Marketing') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-draw-line"></span>}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Cloud" onClick={() => window.scrollTo(0, 0)} className={`relative inline-block text-gray-400 hover:text-white transition-colors group ${isCourseCategory('Cloud') ? 'text-white' : ''}`}>
                  Cloud Computing
                  {isCourseCategory('Cloud') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-draw-line"></span>}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Development" onClick={() => window.scrollTo(0, 0)} className={`relative inline-block text-gray-400 hover:text-white transition-colors group ${isCourseCategory('Development') ? 'text-white' : ''}`}>
                  {/* Python Programming */}
                  {isCourseCategory('Development') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-draw-line"></span>}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/certifications" onClick={() => window.scrollTo(0, 0)} className="relative inline-block text-gray-400 hover:text-white transition-colors group">
                  AWS Certified
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/certifications" onClick={() => window.scrollTo(0, 0)} className="relative inline-block text-gray-400 hover:text-white transition-colors group">
                  Google Certified
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/certifications" onClick={() => window.scrollTo(0, 0)} className="relative inline-block text-gray-400 hover:text-white transition-colors group">
                  Microsoft Certified
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/certifications" onClick={() => window.scrollTo(0, 0)} className="relative inline-block text-gray-400 hover:text-white transition-colors group">
                  Industry Recognized
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="relative">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <a href="tel:+919876543210" className="relative inline-block text-gray-400 hover:text-white transition-colors group">
                    +91 98765 43210
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <TbDeviceLandlinePhone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="tel:08012345678" className="relative inline-block text-gray-400 hover:text-white transition-colors group">
                  080-1234-5678
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Printer className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="relative inline-block text-gray-400 hover:text-white transition-colors group cursor-default">
                  080-4567-8901
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </li>
              <li className="flex items-center justify-between space-x-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <a href="mailto:info@vspaze.com" className="relative inline-block text-gray-400 hover:text-white transition-colors group">
                    info@vspaze.com
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </div>
                {/* Scroll to Top Button - Aligned with email line */}
                <button
                  onClick={scrollToTop}
                  className="bg-white hover:bg-gray-100 text-gray-900 p-2.5 rounded-lg transition-all shadow-lg flex-shrink-0"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col lg:flex-row items-center justify-between text-gray-400">
          <p className="mb-4 lg:mb-0">&copy; 2024 Vspaze Institute. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        @keyframes drawLine {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        .animate-draw-line {
          animation: drawLine 0.3s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default InstituteFooter;
