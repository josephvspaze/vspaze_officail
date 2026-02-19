import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, BookOpen, FileText, GraduationCap, Award, ChevronDown } from 'lucide-react';
import api from '../../utils/api';

const CustomSelect = ({ value, onChange, options, placeholder, icon: Icon, required }) => {
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
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none cursor-pointer bg-white flex items-center justify-between"
      >
        {Icon && <Icon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer transition-colors first:rounded-t-xl last:rounded-b-xl ${
                value === option.value
                  ? 'bg-teal-500 text-white'
                  : 'hover:bg-teal-50 text-gray-900'
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

const TeacherRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    qualification: '',
    resume: '',
    bio: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Try API first
      const response = await api.post('/auth/faculty/register', formData);
      
      if (response.data.success) {
        // Also save to localStorage for admin to see
        const pending = JSON.parse(localStorage.getItem('pending_faculty') || '[]');
        pending.push({
          id: Date.now(),
          ...formData,
          registeredAt: new Date().toISOString()
        });
        localStorage.setItem('pending_faculty', JSON.stringify(pending));
        
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', specialization: '', experience: '', qualification: '', resume: '', bio: '' });
      }
    } catch (error) {
      console.log('API failed, saving to localStorage only');
      // Fallback: Save to localStorage even if API fails
      const pending = JSON.parse(localStorage.getItem('pending_faculty') || '[]');
      pending.push({
        id: Date.now(),
        ...formData,
        registeredAt: new Date().toISOString()
      });
      localStorage.setItem('pending_faculty', JSON.stringify(pending));
      
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', specialization: '', experience: '', qualification: '', resume: '', bio: '' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-teal-400">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-teal-400">
            <GraduationCap className="w-10 h-10 text-teal-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in joining Vspaze Institute. Our HR team will review your application and contact you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-teal-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-transparent rounded-full border-2 border-teal-600 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-10 h-10 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Faculty Application</h2>
            <p className="text-gray-600">Join our team of expert educators at Vspaze Institute</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization <span className="text-red-500">*</span></label>
              <CustomSelect
                value={formData.specialization}
                onChange={(value) => setFormData({...formData, specialization: value})}
                options={[
                  { value: '', label: 'Select your specialization' },
                  ...courses.map(course => ({
                    value: course.name,
                    label: course.name
                  }))
                ]}
                placeholder="Select your specialization"
                icon={BookOpen}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience <span className="text-red-500">*</span></label>
              <CustomSelect
                value={formData.experience}
                onChange={(value) => setFormData({...formData, experience: value})}
                options={[
                  { value: '', label: 'Select experience' },
                  { value: '1-3 years', label: '1-3 years' },
                  { value: '3-5 years', label: '3-5 years' },
                  { value: '5-8 years', label: '5-8 years' },
                  { value: '8-12 years', label: '8-12 years' },
                  { value: '12+ years', label: '12+ years' }
                ]}
                placeholder="Select experience"
                icon={Award}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highest Qualification <span className="text-red-500">*</span></label>
              <div className="relative">
                <GraduationCap className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="e.g., M.Tech in Computer Science"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV Link</label>
              <div className="relative">
                <FileText className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={formData.resume}
                  onChange={(e) => setFormData({...formData, resume: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="https://drive.google.com/your-resume"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brief Bio <span className="text-red-500">*</span></label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                placeholder="Tell us about your teaching experience, industry background, and why you want to join Vspaze..."
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            We'll review your application and get back to you soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegistration;
