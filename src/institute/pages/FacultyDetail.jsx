import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import { ArrowLeft, Award, BookOpen, Users, Calendar, Star, Mail, Phone, Linkedin, Github } from 'lucide-react';


const FacultyDetail = () => {
  const { id } = useParams();
  const [facultyMember, setFacultyMember] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock faculty data as fallback
  const mockFacultyData = [
    { 
      _id: '1', 
      name: 'Dr. Rajesh Kumar', 
      specialization: 'Full Stack Development', 
      qualification: 'M.Tech, IIT Delhi', 
      experience: '12+ Years',
      bio: 'Passionate educator with extensive industry experience in building scalable web applications',
      assignedCourses: ['Full Stack Development', 'React.js', 'Node.js']
    },
    { 
      _id: '2', 
      name: 'Priya Sharma', 
      specialization: 'Data Science & AI', 
      qualification: 'PhD in Computer Science', 
      experience: '10+ Years',
      bio: 'Expert in machine learning and artificial intelligence with research background',
      assignedCourses: ['Data Science', 'Machine Learning', 'Python']
    },
    { 
      _id: '3', 
      name: 'Amit Patel', 
      specialization: 'Cloud Computing', 
      qualification: 'B.Tech, AWS Certified', 
      experience: '8+ Years',
      bio: 'Cloud architecture specialist with hands-on experience in AWS and Azure',
      assignedCourses: ['Cloud Computing', 'AWS', 'DevOps']
    },
    { 
      _id: '4', 
      name: 'Sneha Reddy', 
      specialization: 'Digital Marketing', 
      qualification: 'MBA, Google Certified', 
      experience: '7+ Years',
      bio: 'Digital marketing strategist with proven track record in brand building',
      assignedCourses: ['Digital Marketing', 'SEO', 'Social Media Marketing']
    }
  ];

  useEffect(() => {
    fetchFacultyMember();
  }, [id]);

  const fetchFacultyMember = async () => {
    try {
      setLoading(true);
      const response = await api.get('/faculty');
      const faculty = response.data.faculty || [];
      const member = faculty.find(f => f._id === id);
      
      if (member) {
        setFacultyMember(member);
      } else {
        // Fallback to mock data if not found in API
        const mockMember = mockFacultyData.find(f => f._id === id);
        setFacultyMember(mockMember || mockFacultyData[0]);
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
      // Use mock data as fallback
      const mockMember = mockFacultyData.find(f => f._id === id);
      setFacultyMember(mockMember || mockFacultyData[0]);
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

  const achievements = [
    'Published 15+ research papers in top-tier journals',
    'Led development teams at Fortune 500 companies',
    'Certified AWS Solutions Architect Professional',
    'Speaker at 20+ international tech conferences',
    'Mentored 500+ students to successful careers'
  ];

  const studentReviews = [
    { name: 'Rahul Sharma', rating: 5, review: 'Excellent teaching methodology. Made complex concepts very easy to understand.' },
    { name: 'Priya Patel', rating: 5, review: 'Best mentor I ever had. Always available for doubt clearing and career guidance.' },
    { name: 'Amit Kumar', rating: 5, review: 'Real industry experience shows in teaching. Learned practical skills that helped in job.' }
  ];

  const upcomingClasses = [
    { date: '2024-02-15', time: '10:00 AM', topic: 'Advanced React Concepts', duration: '2 hours' },
    { date: '2024-02-17', time: '2:00 PM', topic: 'Node.js Best Practices', duration: '1.5 hours' },
    { date: '2024-02-20', time: '11:00 AM', topic: 'Database Design Patterns', duration: '2 hours' }
  ];

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
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  <span>4.9/5 Rating</span>
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
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {facultyMember.bio} With over {facultyMember.experience} of hands-on experience in the industry, 
                I bring real-world insights and practical knowledge to the classroom. My teaching philosophy focuses 
                on bridging the gap between theoretical concepts and industry applications.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                I have worked with leading technology companies and have been instrumental in developing scalable 
                solutions that serve millions of users. My passion for teaching stems from the belief that 
                knowledge sharing accelerates innovation and creates opportunities for the next generation of developers.
              </p>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Achievements</h2>
              <ul className="space-y-4">
                {achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start">
                    <Award className="w-6 h-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Student Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Student Reviews</h2>
              <div className="space-y-6">
                {studentReviews.map((review, idx) => (
                  <div key={idx} className="border-l-4 border-teal-500 pl-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-900">{review.name}</span>
                    </div>
                    <p className="text-gray-600 italic">"{review.review}"</p>
                  </div>
                ))}
              </div>
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

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Teaching Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Students Taught</span>
                  <span className="font-bold text-2xl text-teal-600">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-bold text-2xl text-yellow-500">4.9/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Years Teaching</span>
                  <span className="font-bold text-2xl text-cyan-600">8+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-bold text-2xl text-teal-700">95%</span>
                </div>
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Classes</h3>
              <div className="space-y-3">
                {upcomingClasses.map((class_, idx) => (
                  <div key={idx} className="border border-teal-200 bg-teal-50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-900">{class_.topic}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {class_.date} at {class_.time}
                    </div>
                    <div className="text-sm text-teal-600 font-semibold">{class_.duration}</div>
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