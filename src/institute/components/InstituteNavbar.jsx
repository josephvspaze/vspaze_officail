import React, { useState, useEffect } from 'react';
import { GraduationCap, Menu, X, Home, Info, BookOpen, Users, Award, Phone, UserPlus, Shield, DollarSign, CheckCircle, ChevronDown, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const InstituteNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen !== null) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    {
      name: 'Academics',
      icon: BookOpen,
      dropdown: [
        { name: 'All Courses', path: '/courses', icon: BookOpen },
        { name: 'Faculty', path: '/faculty', icon: Users },
        { name: 'Certifications', path: '/certifications', icon: CheckCircle }
      ]
    },
    {
      name: 'Admissions',
      icon: DollarSign,
      dropdown: [
        { name: 'Fees & Payment', path: '/admissions', icon: DollarSign },
        { name: 'Apply Now', path: '/student-registration', icon: UserPlus }
      ]
    },
    { name: 'Success Stories', path: '/success-stories', icon: Award },
    { name: 'Contact', path: '/contact', icon: Phone }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
    <nav className="bg-teal-700/75 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center border-2 border-white">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold"><span className="text-white">V</span><span className="text-cyan-300">spaze</span></span>
              <span className="text-2xl font-bold ml-2 text-white">Institute</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, idx) => (
              item.dropdown ? (
                <div 
                  key={idx} 
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(idx)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(dropdownOpen === idx ? null : idx);
                    }}
                    className="relative flex items-center space-x-1 font-medium text-white hover:text-cyan-200 transition-colors group"
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === idx ? 'rotate-180' : ''}`} />
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-cyan-200 w-0 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  {dropdownOpen === idx && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-teal-700/80 backdrop-blur-md rounded-lg shadow-lg border border-white/10 py-2 z-50">
                      {item.dropdown.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          to={subItem.path}
                          onClick={() => setDropdownOpen(null)}
                          className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/10 hover:text-cyan-200 transition-colors group"
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span className="relative">
                            {subItem.name}
                            {isActive(subItem.path) && (
                              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-200"></span>
                            )}
                            <span className="absolute -bottom-1 left-0 h-0.5 bg-cyan-200 w-0 group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative font-medium text-white hover:text-cyan-200 transition-colors group"
                >
                  {item.name}
                  {isActive(item.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-200 animate-draw-line"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-cyan-200 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            ))}
            <Link
              to="/student-login"
              className="relative text-white hover:text-cyan-200 font-medium transition-colors group"
            >
              Student Login
              <span className="absolute -bottom-1 left-0 h-0.5 bg-cyan-200 w-0 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      <style jsx>{`
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
    </nav>

    {/* Mobile Menu Overlay */}
    <div 
      className={`fixed inset-0 bg-black/50 z-[100] md:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setIsOpen(false)}
    />

    {/* Mobile Menu Sidebar */}
    <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-teal-600 to-teal-700 shadow-2xl z-[101] md:hidden overflow-y-auto transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <img src="/icon.png" alt="Vspaze" className="w-5 h-5 object-contain" />
            </div>
            <span className="font-bold text-white">Vspaze</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-4">
          {navItems.map((item, idx) => (
            item.dropdown ? (
              <div key={idx} className="mb-2">
                <div className="flex items-center space-x-3 px-4 py-3 text-white font-medium">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                <div className="ml-4 space-y-1">
                  {item.dropdown.map((subItem, subIdx) => (
                    <Link
                      key={subIdx}
                      to={subItem.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                        isActive(subItem.path)
                          ? 'bg-white/20 text-cyan-200'
                          : 'text-cyan-100 hover:bg-white/10'
                      }`}
                    >
                      <subItem.icon className="w-4 h-4" />
                      <span className="text-sm">{subItem.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  isActive(item.path)
                    ? 'bg-white/20 text-cyan-200'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          ))}
          
          <div className="border-t border-white/10 mt-4 pt-4">
            <Link
              to="/student-login"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Student Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstituteNavbar;
