import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, DollarSign, Users, CheckCircle, ArrowRight, Code, Database, Megaphone, Cloud, Palette, Users as UsersIcon } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../utils/api';

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const category = searchParams.get('category') || 'All';
    setSelectedCategory(category);
  }, [searchParams]);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconType = (courseName) => {
    const name = courseName.toLowerCase();
    if (name.includes('full stack') || name.includes('web')) return 'code';
    if (name.includes('data') || name.includes('ai')) return 'database';
    if (name.includes('marketing')) return 'megaphone';
    if (name.includes('cloud')) return 'cloud';
    if (name.includes('design') || name.includes('ui')) return 'palette';
    return 'users';
  };

  const categories = ['All', 'Development', 'Data Science', 'Marketing', 'Design', 'Cloud'];

  const filteredCourses = courses.filter(course => {
    if (selectedCategory === 'All') return true;
    const courseName = course.name.toLowerCase();
    const category = selectedCategory.toLowerCase();
    
    if (category === 'development') {
      return courseName.includes('development') || courseName.includes('full stack') || 
             courseName.includes('web') || courseName.includes('java') || 
             courseName.includes('python') || courseName.includes('mobile');
    }
    if (category === 'data science') {
      return courseName.includes('data') || courseName.includes('ai') || 
             courseName.includes('machine learning') || courseName.includes('analytics');
    }
    if (category === 'marketing') {
      return courseName.includes('marketing') || courseName.includes('digital');
    }
    if (category === 'design') {
      return courseName.includes('design') || courseName.includes('ui') || courseName.includes('ux');
    }
    if (category === 'cloud') {
      return courseName.includes('cloud') || courseName.includes('aws') || courseName.includes('azure');
    }
    return true;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Courses</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            100% Online Courses - Learn from anywhere, anytime with live classes
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12"><div className="text-xl text-gray-600">Loading courses...</div></div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12"><div className="text-xl text-gray-600">No courses found in this category</div></div>
          ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {filteredCourses.map((course) => {
              const iconType = getIconType(course.name);
              return (
              <Link
                key={course._id}
                to={`/course/${course._id}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden block flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
              >
                <div className="bg-gradient-to-br from-teal-600 to-cyan-500 p-8 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {iconType === 'code' && <Code className="w-10 h-10 text-white" />}
                    {iconType === 'database' && <Database className="w-10 h-10 text-white" />}
                    {iconType === 'megaphone' && <Megaphone className="w-10 h-10 text-white" />}
                    {iconType === 'cloud' && <Cloud className="w-10 h-10 text-white" />}
                    {iconType === 'palette' && <Palette className="w-10 h-10 text-white" />}
                    {iconType === 'users' && <UsersIcon className="w-10 h-10 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white min-h-[64px] flex items-center justify-center">{course.name}</h3>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 mb-4 h-12 line-clamp-2">{course.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-teal-600" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <DollarSign className="w-5 h-5 mr-2 text-cyan-600" />
                      <span className="font-bold text-cyan-600">₹{course.fee?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mb-4 flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                    <div className="space-y-1">
                      {course.subjects && course.subjects.length > 0 ? (
                        course.subjects.slice(0, 4).map((item, idx) => (
                          <div key={idx} className="flex items-start text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500 italic">Course content coming soon</div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button
                      className="flex-1 text-center bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                    >
                      View Details
                    </button>
                    <Link
                      to="/student-registration"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 text-center bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-900 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 opacity-90">Contact us for customized online training programs</p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl transition-all"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Courses;
