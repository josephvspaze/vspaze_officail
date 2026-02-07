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
      // Use /faculty endpoint (becomes https://vspaze.com/api/faculty)
      const response = await api.get('/faculty');
      setFaculty(response.data.faculty || []);
    } catch (error) {
      console.error('Error fetching faculty:', error);
      // Fallback to empty array if API fails
      setFaculty([]);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-500 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Meet Our Expert Faculty</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Learn online from industry professionals with years of real-world experience
          </p>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-10 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {faculty.map((member) => (
              <Link
                key={member._id}
                to={`/faculty/${member._id}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden block flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] border border-teal-400"
                style={{boxShadow: '0 0 20px rgba(20, 184, 166, 0.3), 0 10px 25px rgba(0, 0, 0, 0.1)'}}
              >
                <div className="bg-gradient-to-br from-teal-600 to-cyan-500 p-8 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-white">
                      {member.name?.split(' ').map(n => n[0]).join('') || 'F'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white min-h-[64px] flex items-center justify-center">{member.name}</h3>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-teal-600 font-semibold text-center mb-4">{member.specialization}</p>
                  <p className="text-gray-600 mb-4 h-12 line-clamp-2 italic text-center">"{member.bio}"</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <GraduationCap className="w-5 h-5 mr-2 text-teal-600" />
                      <span className="text-sm">{member.qualification}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Briefcase className="w-5 h-5 mr-2 text-cyan-600" />
                      <span className="text-sm font-semibold">{member.experience}</span>
                    </div>
                  </div>

                  <div className="mb-4 flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-yellow-500" />
                      Teaches:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(member.assignedCourses || []).map((course, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium"
                        >
                          {typeof course === 'string' ? course : course.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button
                      className="flex-1 text-center bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all border border-teal-400"
                      style={{boxShadow: '0 0 10px rgba(20, 184, 166, 0.2)'}}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-10 md:py-12 bg-gradient-to-r from-teal-900 to-cyan-600 text-white">
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
