import React, { useState, useEffect, useRef } from 'react';
import { X, Download, Code, Database, Megaphone, Cloud, Palette, BookOpen, CheckCircle, Sparkles, ArrowLeft, User, Mail, Phone, MapPin, GraduationCap, ChevronDown, Clock } from 'lucide-react';
import api from '../../utils/api';

const CustomSelect = ({ value, onChange, options, placeholder, icon: Icon, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border ${
          error ? 'border-red-500' : 'border-cyan-500/30'
        } rounded-lg text-white cursor-pointer flex items-center justify-between focus:outline-none focus:border-cyan-500`}
      >
        {Icon && <Icon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />}
        <span className={value ? 'text-white' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-700 border border-cyan-500/30 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer transition-colors ${
                value === option.value
                  ? 'bg-cyan-500 text-white'
                  : 'hover:bg-slate-600 text-white'
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const BrochureModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('form');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    qualification: '',
    interestedCourse: '',
    city: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      fetchCourses();
    }
  }, [isOpen]);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      const apiCourses = response.data.courses || [];
      const formattedCourses = apiCourses.map(course => ({
        id: course._id,
        name: course.name,
        icon: getIconForCourse(course.name),
        description: course.description,
        color: getColorForCourse(course.name)
      }));
      setCourses(formattedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const getIconForCourse = (courseName) => {
    const name = courseName.toLowerCase();
    if (name.includes('full stack') || name.includes('web') || name.includes('mern')) return Code;
    if (name.includes('data') || name.includes('ai')) return Database;
    if (name.includes('marketing')) return Megaphone;
    if (name.includes('cloud')) return Cloud;
    if (name.includes('design') || name.includes('ui')) return Palette;
    return Code;
  };

  const getColorForCourse = (courseName) => {
    const name = courseName.toLowerCase();
    if (name.includes('full stack') || name.includes('mern')) return 'cyan';
    if (name.includes('data') || name.includes('ai')) return 'purple';
    if (name.includes('marketing')) return 'orange';
    if (name.includes('cloud')) return 'teal';
    if (name.includes('design') || name.includes('ui')) return 'pink';
    return 'yellow';
  };

  const qualifications = [
    'High School',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Other'
  ];

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.qualification) {
      errors.qualification = 'Qualification is required';
    }
    
    if (!formData.interestedCourse) {
      errors.interestedCourse = 'Please select a course';
    }
    
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you can add API call to save form data
      console.log('Form submitted:', formData);
      setStep('courses');
    }
  };

  const handleDownload = () => {
    const courseName = selectedCourse.name.toLowerCase();
    let pdfPath = '';
    let fileName = '';
    
    if (courseName.includes('full stack') || courseName.includes('mern')) {
      pdfPath = '/Vspaze Institute MERN Stack Complete Curriculum.pdf';
      fileName = 'Vspaze-MERN-Stack-Curriculum.pdf';
    } else if (courseName.includes('data structures') || courseName.includes('dsa') || courseName.includes('c++')) {
      pdfPath = '/Vspaze Institute Data Structures  And Algorithms Using C Plus Plus  Complete Curriculum.pdf';
      fileName = 'Vspaze-DSA-CPP-Curriculum.pdf';
    } else {
      setStep('coming-soon');
      return;
    }
    
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setSelectedCourse(null);
      setStep('courses');
    }, 1000);
  };

  const handleClose = () => {
    setStep('form');
    setSelectedCourse(null);
    setFormData({
      fullName: '',
      mobile: '',
      email: '',
      qualification: '',
      interestedCourse: '',
      city: ''
    });
    setFormErrors({});
    onClose();
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setStep('courses');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/30">
        <div className="p-4 sm:p-6 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step !== 'form' && (
              <button onClick={() => step === 'download' ? handleBackToCourses() : setStep('form')} className="p-2 hover:bg-slate-700 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-cyan-400" />
              </button>
            )}
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {step === 'form' ? 'Get Course Brochure' : step === 'courses' ? 'Select Your Course' : 'Download Brochure'}
            </h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-slate-700 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4 sm:p-6 min-h-[200px]">
          {step === 'form' ? (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <p className="text-cyan-200 mb-6 text-center text-sm sm:text-base">
                Please fill in your details to access our course brochures
              </p>

              {/* Full Name */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border ${formErrors.fullName ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500`}
                  placeholder="Enter your full name"
                />
                {formErrors.fullName && <p className="text-red-400 text-sm mt-1">{formErrors.fullName}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border ${formErrors.mobile ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500`}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                />
                {formErrors.mobile && <p className="text-red-400 text-sm mt-1">{formErrors.mobile}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  Email ID *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border ${formErrors.email ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500`}
                  placeholder="Enter your email address"
                />
                {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  Qualification *
                </label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border ${formErrors.qualification ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-white focus:outline-none focus:border-cyan-500`}
                >
                  <option value="">Select your qualification</option>
                  {qualifications.map((qual, idx) => (
                    <option key={idx} value={qual}>{qual}</option>
                  ))}
                </select>
                {formErrors.qualification && <p className="text-red-400 text-sm mt-1">{formErrors.qualification}</p>}
              </div>

              {/* Interested Course */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  Interested Course *
                </label>
                <CustomSelect
                  value={formData.interestedCourse}
                  onChange={(value) => {
                    setFormData(prev => ({ ...prev, interestedCourse: value }));
                    if (formErrors.interestedCourse) {
                      setFormErrors(prev => ({ ...prev, interestedCourse: '' }));
                    }
                  }}
                  options={[
                    { value: '', label: 'Select a course' },
                    ...courses.map(course => ({
                      value: course.name,
                      label: course.name
                    }))
                  ]}
                  placeholder="Select a course"
                  icon={BookOpen}
                  error={formErrors.interestedCourse}
                />
                {formErrors.interestedCourse && <p className="text-red-400 text-sm mt-1">{formErrors.interestedCourse}</p>}
              </div>

              {/* City */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  City / Location *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border ${formErrors.city ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500`}
                  placeholder="Enter your city"
                />
                {formErrors.city && <p className="text-red-400 text-sm mt-1">{formErrors.city}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 mt-6"
              >
                Submit & Access Brochures
              </button>

              <p className="text-cyan-300 text-center text-xs sm:text-sm mt-4">
                * All fields are required
              </p>
            </form>
          ) : step === 'courses' ? (
            <>
              <p className="text-cyan-200 mb-6 text-center text-sm sm:text-base">
                Thank you, <span className="font-bold text-white">{formData.fullName}</span>! Select a course to download the brochure
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {courses.map((course) => {
                  const IconComponent = course.icon;
                  const colorMap = {
                    cyan: { border: 'border-cyan-500/30', hoverBorder: 'hover:border-cyan-500', hoverBg: 'hover:bg-cyan-500/10', icon: 'text-cyan-400', text: 'text-cyan-400', bg: 'bg-cyan-500/20' },
                    purple: { border: 'border-purple-500/30', hoverBorder: 'hover:border-purple-500', hoverBg: 'hover:bg-purple-500/10', icon: 'text-purple-400', text: 'text-purple-400', bg: 'bg-purple-500/20' },
                    orange: { border: 'border-orange-500/30', hoverBorder: 'hover:border-orange-500', hoverBg: 'hover:bg-orange-500/10', icon: 'text-orange-400', text: 'text-orange-400', bg: 'bg-orange-500/20' },
                    teal: { border: 'border-teal-500/30', hoverBorder: 'hover:border-teal-500', hoverBg: 'hover:bg-teal-500/10', icon: 'text-teal-400', text: 'text-teal-400', bg: 'bg-teal-500/20' },
                    pink: { border: 'border-pink-500/30', hoverBorder: 'hover:border-pink-500', hoverBg: 'hover:bg-pink-500/10', icon: 'text-pink-400', text: 'text-pink-400', bg: 'bg-pink-500/20' },
                    yellow: { border: 'border-yellow-500/30', hoverBorder: 'hover:border-yellow-500', hoverBg: 'hover:bg-yellow-500/10', icon: 'text-yellow-400', text: 'text-yellow-400', bg: 'bg-yellow-500/20' }
                  };
                  const colors = colorMap[course.color];
                  
                  return (
                    <button 
                      key={course.id} 
                      onClick={() => {
                        setSelectedCourse(course);
                        setStep('download');
                      }} 
                      className={`p-4 sm:p-6 border-2 ${colors.border} ${colors.hoverBorder} ${colors.hoverBg} rounded-xl transition-all bg-slate-700/50 text-left hover:scale-105`}
                    >
                      <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mb-4 border ${colors.border}`}>
                        <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{course.name}</h3>
                      <p className="text-cyan-200 text-xs sm:text-sm mb-3">{course.description}</p>
                      <div className={`flex items-center ${colors.text} text-xs sm:text-sm font-semibold`}>
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        <span>Get Brochure</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : step === 'coming-soon' ? (
            <div className="text-center py-8">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-xl flex items-center justify-center border-2 ${
                selectedCourse.color === 'cyan' ? 'bg-cyan-500/20 border-cyan-500' :
                selectedCourse.color === 'purple' ? 'bg-purple-500/20 border-purple-500' :
                selectedCourse.color === 'orange' ? 'bg-orange-500/20 border-orange-500' :
                selectedCourse.color === 'teal' ? 'bg-teal-500/20 border-teal-500' :
                selectedCourse.color === 'pink' ? 'bg-pink-500/20 border-pink-500' :
                'bg-yellow-500/20 border-yellow-500'
              }`}>
                <Clock className={`w-10 h-10 ${
                  selectedCourse.color === 'cyan' ? 'text-cyan-400' :
                  selectedCourse.color === 'purple' ? 'text-purple-400' :
                  selectedCourse.color === 'orange' ? 'text-orange-400' :
                  selectedCourse.color === 'teal' ? 'text-teal-400' :
                  selectedCourse.color === 'pink' ? 'text-pink-400' :
                  'text-yellow-400'
                }`} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{selectedCourse.name}</h3>
              <p className="text-cyan-200 text-lg mb-6">Brochure Coming Soon!</p>
              <p className="text-cyan-300 mb-8">We're preparing a comprehensive brochure for this course. Check back soon!</p>
              <button
                onClick={handleBackToCourses}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                Back to Courses
              </button>
            </div>
          ) : (
            <div>
              <div className="bg-slate-700/50 rounded-xl p-4 sm:p-6 border border-cyan-500/20">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                  {(() => {
                    const colorMap = {
                      cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', icon: 'text-cyan-400', button: 'from-cyan-500 to-cyan-600' },
                      purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', icon: 'text-purple-400', button: 'from-purple-500 to-purple-600' },
                      orange: { bg: 'bg-orange-500/20', border: 'border-orange-500/30', icon: 'text-orange-400', button: 'from-orange-500 to-orange-600' },
                      teal: { bg: 'bg-teal-500/20', border: 'border-teal-500/30', icon: 'text-teal-400', button: 'from-teal-500 to-teal-600' },
                      pink: { bg: 'bg-pink-500/20', border: 'border-pink-500/30', icon: 'text-pink-400', button: 'from-pink-500 to-pink-600' },
                      yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', icon: 'text-yellow-400', button: 'from-yellow-500 to-yellow-600' }
                    };
                    const colors = colorMap[selectedCourse.color];
                    
                    return (
                      <>
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 ${colors.bg} rounded-xl flex items-center justify-center border ${colors.border} flex-shrink-0`}>
                          {React.createElement(selectedCourse.icon, { 
                            className: `w-8 h-8 sm:w-10 sm:h-10 ${colors.icon}` 
                          })}
                        </div>
                        <div className="text-center sm:text-left flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedCourse.name}</h3>
                          <p className="text-cyan-200 text-sm sm:text-base">{selectedCourse.description}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 sm:p-6 mb-6 border border-cyan-500/10">
                  <div className="flex items-start gap-3 mb-4">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold mb-2 text-sm sm:text-base">Your Journey Starts Here!</p>
                      <p className="text-cyan-200 text-xs sm:text-sm leading-relaxed">
                        Download our comprehensive brochure to discover how this course can transform your career.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      'Complete curriculum details',
                      'Fee structure & payment options',
                      'Placement assistance details',
                      'Success stories & testimonials'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                        <span className="text-cyan-200 text-xs sm:text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {(() => {
                  const colorMap = {
                    cyan: 'from-cyan-500 to-cyan-600',
                    purple: 'from-purple-500 to-purple-600',
                    orange: 'from-orange-500 to-orange-600',
                    teal: 'from-teal-500 to-teal-600',
                    pink: 'from-pink-500 to-pink-600',
                    yellow: 'from-yellow-500 to-yellow-600'
                  };
                  const gradient = colorMap[selectedCourse.color];
                  
                  return (
                    <button
                      onClick={handleDownload}
                      className={`w-full bg-gradient-to-r ${gradient} text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 group`}
                    >
                      <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                      <span>Download Brochure Now</span>
                    </button>
                  );
                })()}

                <p className="text-cyan-300 text-center mt-4 text-xs sm:text-sm">
                  💡 Take the first step towards your dream career!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrochureModal;
