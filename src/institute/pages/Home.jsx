import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, BookOpen, TrendingUp, CheckCircle, Star, Code, Database, Megaphone, Cloud, Palette, Briefcase, DollarSign, Clock as ClockIcon, Target, Play, Zap, Shield, Video, ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react';
import DemoModal from '../components/DemoModal';

import api from '../../utils/api';

const TestimonialCarousel = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <div className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all max-w-4xl mx-auto">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">"{testimonial.review}"</p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-teal-600">{testimonial.course}</p>
                  </div>
                  <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold border border-teal-200">{testimonial.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, idx) => (
          <button key={idx} onClick={() => setCurrent(idx)} className={`w-3 h-3 rounded-full transition-all ${ idx === current ? 'bg-black w-8' : 'bg-gray-400' }`} />
        ))}
      </div>
    </div>
  );
};



const Home = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      course: 'Full Stack Development',
      company: 'TCS',
      rating: 5,
      review: 'Vspaze transformed my career! The hands-on projects and expert mentors helped me land my dream job at TCS. The curriculum is industry-focused and the support is exceptional.'
    },
    {
      id: 2,
      name: 'Priya Patel',
      course: 'Data Science & AI',
      company: 'Infosys',
      rating: 5,
      review: 'Best decision I made was joining Vspaze. The live coding sessions and real-world projects gave me the confidence to crack interviews. Now working as a Data Scientist at Infosys!'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      course: 'Cloud Computing',
      company: 'Wipro',
      rating: 5,
      review: 'The faculty at Vspaze are industry experts who genuinely care about student success. The placement support was outstanding. Highly recommend for anyone serious about tech careers.'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      course: 'Digital Marketing',
      company: 'Accenture',
      rating: 5,
      review: 'Amazing learning experience! The course content is up-to-date with industry trends. Got placed at Accenture within 2 months of course completion. Thank you Vspaze team!'
    }
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
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

  return (
    <div className="bg-gradient-to-b from-teal-900 via-teal-800 to-cyan-500">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-900 to-cyan-400 py-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-teal-300/30 rounded-full blur-3xl animate-blob top-0 -left-20"></div>
          <div className="absolute w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl animate-blob animation-delay-2000 top-0 right-0"></div>
          <div className="absolute w-96 h-96 bg-teal-300/30 rounded-full blur-3xl animate-blob animation-delay-4000 bottom-0 left-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left animate-fade-in-up">
              <div className="inline-block mb-4 px-6 py-2 bg-cyan-400/30 backdrop-blur-sm rounded-full text-cyan-100 font-semibold animate-pulse-glow border border-cyan-300/50">
                💻 Engineering Excellence Online
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                Master Tech Skills
                <span className="block bg-gradient-to-r from-teal-200 via-cyan-200 to-teal-200 bg-clip-text text-transparent animate-typing text-3xl sm:text-4xl md:text-5xl">
                  Build Your Future
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-10 leading-relaxed">
                Learn Full Stack, Data Science, Cloud & AI from industry experts. 100% online with live coding sessions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start items-center">
                <Link to="/student-registration" className="group bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:shadow-2xl hover:shadow-teal-500/50 transition-all transform hover:scale-105 flex items-center space-x-3 w-full sm:w-auto justify-center">
                  <span>Start Learning Now</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
                <button onClick={() => setIsDemoModalOpen(true)} className="group bg-transparent border-3 border-teal-300 text-teal-200 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:bg-teal-300 hover:text-teal-900 transition-all flex items-center space-x-3 w-full sm:w-auto justify-center">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Watch Demo</span>
                </button>
              </div>
              <div className="mt-12 flex justify-center md:justify-start items-center space-x-4 sm:space-x-8 text-white">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold">500+</div>
                  <div className="text-xs sm:text-sm opacity-80">Students</div>
                </div>
                <div className="w-px h-8 sm:h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold">100%</div>
                  <div className="text-xs sm:text-sm opacity-80">Placement Support</div>
                </div>
                <div className="w-px h-8 sm:h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold">4.6★</div>
                  <div className="text-xs sm:text-sm opacity-80">Rating</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block animate-fade-in -mt-16">
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" alt="Coding and programming" className="rounded-3xl shadow-2xl shadow-cyan-500/20 transform hover:scale-105 transition-all border border-cyan-500/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, count: '500+', label: 'Students Enrolled', color: 'teal' },
              { icon: Award, count: '25+', label: 'Expert Faculty', color: 'cyan' },
              { icon: BookOpen, count: '15+', label: 'Tech Courses', color: 'teal' },
              { icon: TrendingUp, count: '100%', label: 'Placement Support', color: 'emerald' }
            ].map((stat, idx) => {
              const bgClasses = {
                teal: 'bg-gradient-to-br from-teal-400 to-teal-600',
                cyan: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
                emerald: 'bg-gradient-to-br from-emerald-400 to-emerald-600'
              };
              return (
                <div key={idx} className="text-center">
                  <div className="w-20 h-20 bg-transparent rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-400 shadow-lg shadow-teal-400/50 hover:scale-110 transition-transform">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">{stat.count}</h3>
                  <p className="text-teal-100 font-semibold">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-teal-500/20 text-teal-300 rounded-full font-semibold mb-4 border border-teal-400/30">
              🚀 Trending Tech Courses
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">Master Engineering Skills</h2>
            <p className="text-lg sm:text-xl text-teal-100">Industry-ready courses for aspiring engineers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.slice(0, 6).map((course) => {
              const iconType = getIconType(course.name);
              return (
                <div key={course._id} className="group bg-gradient-to-br from-white to-cyan-50 border border-teal-200/30 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all transform hover:-translate-y-3 overflow-hidden flex flex-col">
                  <div className="relative bg-gradient-to-br from-teal-600 to-cyan-500 p-8 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                    <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {iconType === 'code' && <Code className="w-10 h-10 text-white" />}
                      {iconType === 'database' && <Database className="w-10 h-10 text-white" />}
                      {iconType === 'megaphone' && <Megaphone className="w-10 h-10 text-white" />}
                      {iconType === 'cloud' && <Cloud className="w-10 h-10 text-white" />}
                      {iconType === 'palette' && <Palette className="w-10 h-10 text-white" />}
                      {iconType === 'users' && <Users className="w-10 h-10 text-white" />}
                    </div>
                    <h3 className="text-2xl font-bold text-white relative min-h-[64px] flex items-center justify-center">{course.name}</h3>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-gray-700 mb-6 h-12 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-teal-200/30">
                      <span className="flex items-center text-teal-600 font-semibold">
                        <ClockIcon className="w-5 h-5 mr-2" /> {course.duration}
                      </span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">₹{course.fee?.toLocaleString()}</span>
                    </div>
                    <Link to={`/course/${course._id}`} className="block text-center bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-teal-500/30 transition-all group-hover:scale-105 mt-auto">
                      Explore Course →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link to="/courses" className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-teal-500/50 transition-all transform hover:scale-105">
              <span>View All Courses</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">Why Choose Vspaze?</h2>
            <p className="text-lg sm:text-xl text-white/90">Learn from industry experts with hands-on coding experience</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Code, title: 'Live Coding Sessions', desc: 'Learn by coding with expert mentors in real-time', gradient: 'from-teal-500 to-cyan-400' },
              { icon: Briefcase, title: 'Tech Placements', desc: '95% placement in top tech companies & startups', gradient: 'from-emerald-500 to-teal-500' },
              { icon: Target, title: 'Real Projects', desc: 'Build production-ready apps and deploy live', gradient: 'from-cyan-400 to-teal-500' },
              { icon: Video, title: 'Online Classes', desc: 'Live interactive sessions with recorded lectures', gradient: 'from-teal-500 to-cyan-400' },
              { icon: Zap, title: 'Latest Tech Stack', desc: 'Learn cutting-edge technologies used in industry', gradient: 'from-orange-500 to-amber-500' },
              { icon: Award, title: 'Certifications', desc: 'Industry-recognized certificates for your resume', gradient: 'from-pink-500 to-rose-500' }
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all transform hover:-translate-y-2 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Highlights */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 bg-teal-500/20 text-teal-300 rounded-full font-semibold mb-4 border border-teal-400/30">
              👨‍💻 Expert Tech Mentors
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">Learn From Industry Experts</h2>
            <p className="text-lg sm:text-xl text-teal-100">Senior engineers from top tech companies</p>
          </div>
          <div className="mb-16 hidden md:block">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" alt="Tech team collaboration" className="rounded-3xl shadow-2xl shadow-teal-500/20 mx-auto max-w-4xl border border-teal-500/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { id: 1, name: 'Dr. Rajesh Kumar', specialization: 'Full Stack Development', qualification: 'M.Tech, IIT Delhi', experience: '12+ Years', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
              { id: 2, name: 'Priya Sharma', specialization: 'Data Science & AI', qualification: 'PhD in Computer Science', experience: '10+ Years', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
              { id: 3, name: 'Amit Patel', specialization: 'Cloud Computing', qualification: 'B.Tech, AWS Certified', experience: '8+ Years', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
              { id: 4, name: 'Sneha Reddy', specialization: 'Digital Marketing', qualification: 'MBA, Google Certified', experience: '7+ Years', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' }
            ].map((member, idx) => (
              <div key={member.id} className="group bg-gradient-to-br from-white to-cyan-50 border border-teal-200/30 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all transform hover:-translate-y-3 overflow-hidden flex flex-col">
                <div className="relative bg-gradient-to-br from-teal-600 to-cyan-500 p-8 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                  <div className="relative w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white relative min-h-[64px] flex items-center justify-center">{member.name}</h3>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-gray-700 mb-6 h-12 line-clamp-2 font-semibold">{member.specialization}</p>
                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-teal-200/30">
                    <span className="flex items-center text-teal-600 font-semibold text-sm">
                      <Award className="w-5 h-5 mr-2" /> {member.qualification}
                    </span>
                    <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">{member.experience}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/faculty" className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-teal-500/50 transition-all transform hover:scale-105">
              <span>Meet All Faculty</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 bg-white/20 text-white rounded-full font-semibold mb-4 border border-white/30">
              ⭐ Success Stories
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">What Our Students Say</h2>
            <p className="text-lg sm:text-xl text-white/90">Join thousands of successful alumni</p>
          </div>
          <div className="mb-16 hidden md:block">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80" alt="Happy students celebrating graduation and success" className="rounded-3xl shadow-2xl shadow-teal-500/20 mx-auto max-w-4xl border border-white/20" />
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-0 left-0 animate-blob"></div>
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-0 right-0 animate-blob animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">Ready to Start Your Tech Journey?</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-10 opacity-90">Join 500+ engineering students who transformed their careers</p>
          <Link to="/student-registration" className="inline-flex items-center space-x-3 bg-white text-teal-700 px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105">
            <span>Enroll Now - It's Free</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <span className="text-white font-bold text-lg">
              ✓ No Credit Card Required
            </span>
            <span className="text-white font-bold text-lg">
              ✓ Start Coding Today
            </span>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
};

export default Home;
