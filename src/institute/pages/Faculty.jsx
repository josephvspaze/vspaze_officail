import React, { useState, useEffect } from 'react';
import { Award, Briefcase, GraduationCap, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await api.get('/admin/faculty');
      setFaculty(response.data.faculty || []);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Meet Our Expert Faculty</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Learn online from industry professionals with years of real-world experience
          </p>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16 bg-gradient-to-b from-teal-900 via-teal-800 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {faculty.map((member) => (
              <Link
                key={member._id}
                to={`/faculty/${member._id}`}
                className="group bg-gradient-to-br from-white to-cyan-50 border border-teal-400 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all transform hover:-translate-y-3 overflow-hidden flex flex-col"
                style={{boxShadow: '0 0 20px rgba(20, 184, 166, 0.3), 0 10px 25px rgba(0, 0, 0, 0.1)'}}
              >
                <div className="relative bg-gradient-to-br from-teal-600 to-cyan-500 p-6 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                  <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-3xl font-bold text-white">
                      {member.name?.split(' ').map(n => n[0]).join('') || 'F'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white relative min-h-[48px] flex items-center justify-center">{member.name}</h3>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-teal-600 font-semibold text-center mb-3 text-sm">{member.specialization}</p>
                  <p className="text-gray-700 mb-4 h-10 line-clamp-2 italic text-sm">"{member.bio}"</p>
                  <div className="space-y-2 mb-4 pb-4 border-b border-teal-200/30">
                    <div className="flex items-center text-teal-600 font-semibold text-sm">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span className="text-xs">{member.qualification}</span>
                    </div>
                    <div className="flex items-center text-teal-600 font-semibold text-sm">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span className="text-xs">{member.experience}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                      <Award className="w-4 h-4 mr-2 text-yellow-500" />
                      Teaches:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {(member.assignedCourses || []).map((course, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium"
                        >
                          {typeof course === 'string' ? course : course.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="block text-center bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-teal-500/30 transition-all group-hover:scale-105 mt-auto text-sm border border-teal-400" style={{boxShadow: '0 0 10px rgba(20, 184, 166, 0.2)'}}>
                    View Profile →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 bg-gradient-to-r from-teal-900 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Join Our Faculty Team?</h2>
          <p className="text-xl mb-8 opacity-90">We're always looking for passionate online educators</p>
          <a
            href="/teacher-registration"
            className="inline-flex items-center space-x-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl transition-all"
          >
            <span>Apply Now</span>
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Faculty;
