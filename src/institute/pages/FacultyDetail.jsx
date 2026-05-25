import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import { ArrowLeft, BookOpen, Calendar, Mail, Linkedin } from 'lucide-react';


const FacultyDetail = () => {
  const { id } = useParams();
  const [facultyMember, setFacultyMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacultyMember();
  }, [id]);

  const fetchFacultyMember = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/faculty/${id}`);
      setFacultyMember(response.data.faculty);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-gray-600">Loading faculty details...</p>
        </div>
      </div>
    );
  }

  if (!facultyMember) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Faculty member not found</h2>
          <Link to="/faculty" className="text-teal-600 hover:text-teal-700">
            Back to Faculty
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/faculty" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Faculty
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">{facultyMember.name}</h1>
              <p className="text-2xl text-white/90 mb-4">{facultyMember.specialization}</p>
              <p className="text-lg text-white/80 mb-6">{facultyMember.qualification}</p>
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{facultyMember.experience} Experience</span>
                </div>

              </div>
              <div className="flex space-x-4">
                <a href="mailto:info@vspaze.com" className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/30 transition-colors">
                  <Mail className="w-5 h-5 inline mr-2" />
                  Email
                </a>
                <a href="#" className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/30 transition-colors">
                  <Linkedin className="w-5 h-5 inline mr-2" />
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="text-center">
              <div className="w-80 h-80 rounded-full mx-auto shadow-2xl border-8 border-white/20 bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center">
                <span className="text-9xl font-bold text-white">
                  {facultyMember.name?.split(' ').map(n => n[0]).join('') || 'F'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {facultyMember.bio}
              </p>
            </div>


          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Courses Teaching */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-teal-600" />
                Courses Teaching
              </h3>
              <div className="space-y-3">
                {(facultyMember.assignedCourses || []).map((course, idx) => (
                  <div key={idx} className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                    <span className="font-semibold text-teal-800">{typeof course === 'string' ? course : course.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <p className="mb-4 opacity-90">Have questions about the courses or need career guidance?</p>
              <Link 
                to="/contact"
                className="block text-center bg-white text-teal-600 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Contact Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetail;