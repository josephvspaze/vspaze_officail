import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, BookOpen, MapPin, GraduationCap, Camera } from 'lucide-react';
import api from '../../utils/api';

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    parentPhone: '',
    course: '',
    address: '',
    profilePic: null
  });
  const [submitted, setSubmitted] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
    
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll to top when success modal shows
  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Try API first
      const response = await api.post('/auth/student/register', formData);
      
      if (response.data.success) {
        // Also save to localStorage for admin to see
        const pending = JSON.parse(localStorage.getItem('pending_students') || '[]');
        pending.push({
          id: Date.now(),
          ...formData,
          registeredAt: new Date().toISOString()
        });
        localStorage.setItem('pending_students', JSON.stringify(pending));
        
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', parentPhone: '', course: '', address: '', profilePic: null });
      }
    } catch (error) {
      console.log('API failed, saving to localStorage only');
      // Fallback: Save to localStorage even if API fails
      const pending = JSON.parse(localStorage.getItem('pending_students') || '[]');
      pending.push({
        id: Date.now(),
        ...formData,
        registeredAt: new Date().toISOString()
      });
      localStorage.setItem('pending_students', JSON.stringify(pending));
      
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', parentPhone: '', course: '', address: '', profilePic: null });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-50 flex items-start justify-center p-4 pt-20">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-teal-400" style={{boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)'}}>
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-teal-400">
            <GraduationCap className="w-10 h-10 text-teal-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering with Vspaze Institute. Our admin team will review your application and contact you soon.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
          >
            Back to Home
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Registration</h2>
            <p className="text-gray-600">Join Vspaze Institute and start your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture (Optional)</label>
              <div className="flex items-center justify-center">
                <label className="relative cursor-pointer group">
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors overflow-hidden">
                    {formData.profilePic ? (
                      <img 
                        src={URL.createObjectURL(formData.profilePic)} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-xs text-gray-500">Upload Photo</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, profilePic: e.target.files[0]})}
                    className="hidden"
                  />
                </label>
              </div>
              {formData.profilePic && (
                <button
                  type="button"
                  onClick={() => setFormData({...formData, profilePic: null})}
                  className="text-sm text-red-600 hover:text-red-700 mt-2 mx-auto block"
                >
                  Remove Photo
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-600">*</span></label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-600">*</span></label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-600">*</span></label>
              <div className="relative">
                <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parent Mobile Number <span className="text-red-600">*</span></label>
              <div className="relative">
                <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Course <span className="text-red-600">*</span></label>
              <div className="relative">
                <BookOpen className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white appearance-none"
                  required
                >
                  <option value="">Choose a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course.name}>
                      {course.name} - ₹{course.fee}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address <span className="text-red-600">*</span></label>
              <div className="relative">
                <MapPin className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter your complete address"
                  rows="3"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already registered? Our admin will contact you soon after approval.
          </p>
        </div>
      </div>

      <style jsx>{`
        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
          padding-right: 2.5rem;
        }
        
        select option {
          padding: 12px;
          border-radius: 8px;
          background-color: white;
        }
        
        select option:hover {
          background-color: #f0fdfa;
        }
        
        select option:checked {
          background-color: #14b8a6;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default StudentRegistration;
