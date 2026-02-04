import React, { useState } from 'react';
import { User, Mail, Phone, BookOpen, FileText, GraduationCap, Award } from 'lucide-react';
import api from '../../utils/api';

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
              <div className="relative">
                <BookOpen className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none appearance-none"
                  required
                >
                  <option value="">Select your specialization</option>
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Python Programming">Python Programming</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience <span className="text-red-500">*</span></label>
              <div className="relative">
                <Award className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none appearance-none"
                  required
                >
                  <option value="">Select experience</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-8 years">5-8 years</option>
                  <option value="8-12 years">8-12 years</option>
                  <option value="12+ years">12+ years</option>
                </select>
              </div>
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
            We'll review your application and get back to you within 3-5 business days.
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

export default TeacherRegistration;
