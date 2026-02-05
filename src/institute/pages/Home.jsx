import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, BookOpen, TrendingUp, Star, Code, Database, Megaphone, Cloud, Palette, Clock as ClockIcon, Target, Play, Zap, Video, ChevronDown, Download } from 'lucide-react';
import DemoModal from '../components/DemoModal';
import BrochureModal from '../components/BrochureModal';
import api from '../../utils/api';

const CAROUSEL_INTERVAL = 5000;

const TypewriterText = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const sentences = [
    "with Industry Experts",
    "Build Real Projects",
  ];

  useEffect(() => {
    const currentSentence = sentences[sentenceIndex];
    let timer;

    if (!isDeleting && text === currentSentence) {
      // Pause at end before deleting
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      // Move to next sentence
      setIsDeleting(false);
      setSentenceIndex((prev) => (prev + 1) % sentences.length);
    } else {
      // Type or delete character
      const timeout = isDeleting ? 50 : 100;
      timer = setTimeout(() => {
        setText(currentSentence.slice(0, text.length + (isDeleting ? -1 : 1)));
      }, timeout);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, sentenceIndex]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className="block bg-gradient-to-r from-teal-200 via-cyan-200 to-teal-200 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl min-h-[3.5rem] pb-2">
      {text}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
    </span>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-white text-center py-8">Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

const TestimonialCarousel = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Duplicate testimonials for infinite loop
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrent((prev) => prev + 1);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Reset to middle set when reaching the end
    if (current >= testimonials.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(testimonials.length);
      }, 500);
    }
  }, [current, testimonials.length]);

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrent(testimonials.length + index);
  };

  return (
    <div className="relative" role="region" aria-label="Student testimonials carousel">
      <div className="overflow-hidden">
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`} 
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {extendedTestimonials.map((testimonial, idx) => (
            <div key={`${testimonial.id}-${idx}`} className="w-full flex-shrink-0 px-4">
              <div className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all max-w-4xl mx-auto">
                <div className="flex items-center mb-6" aria-label={`${testimonial.rating} star rating`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" aria-hidden="true" />
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
      <div className="flex justify-center mt-8 space-x-2" role="tablist" aria-label="Testimonial navigation">
        {testimonials.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => goToSlide(idx)} 
            className={`w-3 h-3 rounded-full transition-all ${(current % testimonials.length) === idx ? 'bg-white w-8' : 'bg-white/50'}`}
            aria-label={`Go to testimonial ${idx + 1}`}
            aria-current={(current % testimonials.length) === idx}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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
      setLoading(true);
      setError(null);
      const response = await api.get('/courses');
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (courseName) => {
    const name = courseName.toLowerCase();
    if (name.includes('full stack') || name.includes('web')) return Code;
    if (name.includes('data') || name.includes('ai')) return Database;
    if (name.includes('marketing')) return Megaphone;
    if (name.includes('cloud')) return Cloud;
    if (name.includes('design') || name.includes('ui')) return Palette;
    return Users;
  };

  return (
    <ErrorBoundary>
      <div className="bg-gradient-to-b from-teal-900 via-teal-800 to-cyan-500 select-none" onContextMenu={(e) => e.preventDefault()}>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-teal-900 to-cyan-400 py-12 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute w-96 h-96 bg-teal-300/30 rounded-full blur-3xl top-0 -left-20"></div>
            <div className="absolute w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl top-0 right-0"></div>
            <div className="absolute w-96 h-96 bg-teal-300/30 rounded-full blur-3xl bottom-0 left-1/2"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <div className="inline-block mb-4 px-6 py-2 bg-cyan-400/30 backdrop-blur-sm rounded-full text-cyan-100 font-semibold border border-cyan-300/50">
                   Engineering Excellence Online
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3 sm:mb-4 leading-[1.2]">
                  Master Tech Skills
                  <TypewriterText />
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-3 sm:mb-6 leading-[1.4]">
                  Learn Full Stack, Data Science, Cloud & AI from industry experts. 100% online with live coding sessions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center md:justify-start items-center">
                  <Link to="/student-registration" className="group bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:shadow-2xl hover:shadow-teal-500/50 ring-[0.5px] ring-black transition-all transform hover:scale-105 flex items-center space-x-3 w-full sm:w-auto justify-center">
                    <span>Start Learning Now</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <button onClick={() => setIsBrochureModalOpen(true)} className="group bg-transparent border-4 border-teal-300 text-teal-200 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:bg-teal-300 hover:text-teal-900 transition-all flex items-center space-x-3 w-full sm:w-auto justify-center">
                    <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Get Brochure</span>
                  </button>
                  {/* Keep Watch Demo functionality - commented out for now */}
                  {/* <button onClick={() => setIsDemoModalOpen(true)} className="group bg-transparent border-4 border-teal-300 text-teal-200 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:bg-teal-300 hover:text-teal-900 transition-all flex items-center space-x-3 w-full sm:w-auto justify-center">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Watch Demo</span>
                  </button> */}
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
              <div className="hidden md:block">
                <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" alt="Developer coding on laptop with multiple screens" className="rounded-3xl shadow-2xl shadow-cyan-500/20 transform hover:scale-105 transition-all border border-black" loading="lazy" />
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
                { icon: Users, count: '500+', label: 'Students Enrolled' },
                { icon: Award, count: '25+', label: 'Expert Faculty' },
                { icon: BookOpen, count: '15+', label: 'Tech Courses' },
                { icon: TrendingUp, count: '100%', label: 'Placement Support' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-20 h-20 bg-transparent rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-400 shadow-lg shadow-teal-400/50 hover:scale-110 transition-transform">
                    <stat.icon className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">{stat.count}</h3>
                  <p className="text-teal-100 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 bg-teal-500/20 text-teal-300 rounded-full font-semibold mb-4 border border-teal-400/30">
                 Trending Tech Courses
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">Master Engineering Skills</h2>
              <p className="text-lg sm:text-xl text-teal-100">Industry-ready courses for aspiring engineers</p>
            </div>

            {loading && (
              <div className="text-center text-white text-xl py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <p className="mt-4">Loading courses...</p>
              </div>
            )}

            {error && (
              <div className="text-center text-red-300 bg-red-900/30 border border-red-500/50 rounded-2xl p-8 mb-8">
                <p className="text-xl">{error}</p>
                <button onClick={fetchCourses} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && courses.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {courses.slice(0, 6).map((course) => {
                    const IconComponent = getIconComponent(course.name);
                    return (
                      <div key={course._id} className="group bg-gradient-to-br from-white to-cyan-50 border border-teal-400 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all transform hover:-translate-y-3 overflow-hidden flex flex-col" style={{boxShadow: '0 0 20px rgba(20, 184, 166, 0.3), 0 10px 25px rgba(0, 0, 0, 0.1)'}}>
                        <div className="relative bg-gradient-to-br from-teal-600 to-cyan-500 p-8 text-center overflow-hidden">
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                          <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <IconComponent className="w-10 h-10 text-white" aria-hidden="true" />
                          </div>
                          <h3 className="text-2xl font-bold text-white relative min-h-[64px] flex items-center justify-center">{course.name}</h3>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                          <p className="text-gray-700 mb-6 h-12 line-clamp-2">{course.description}</p>
                          <div className="flex justify-between items-center mb-6 pb-6 border-b border-teal-200/30">
                            <span className="flex items-center text-teal-600 font-semibold">
                              <ClockIcon className="w-5 h-5 mr-2" aria-hidden="true" /> {course.duration}
                            </span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">₹{course.fee?.toLocaleString()}</span>
                          </div>
                          <Link to={`/course/${course._id}`} className="block text-center bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-teal-500/30 transition-all group-hover:scale-105 mt-auto border border-teal-400" style={{boxShadow: '0 0 10px rgba(20, 184, 166, 0.2)'}}>
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
              </>
            )}
          </div>
        </section>

        {/* Motivational Quote Banner */}
        <section className="py-16 border-t border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-600"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="mb-6">
              <svg className="w-16 h-16 text-white/30 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              "Your Career Transformation Starts Here"
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 italic">
              Join thousands of students who transformed their passion into a successful tech career. 
              Don't just dream about your future — build it with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/student-registration" className="bg-white text-teal-700 px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all transform hover:scale-105">
                Start Your Journey Today
              </Link>
              <Link to="/courses" className="border-2 border-white text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-teal-700 transition-all">
                Explore Our Courses
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
                { icon: Target, title: 'Tech Placements', desc: '95% placement in top tech companies & startups', gradient: 'from-emerald-500 to-teal-500' },
                { icon: Target, title: 'Real Projects', desc: 'Build production-ready apps and deploy live', gradient: 'from-cyan-400 to-teal-500' },
                { icon: Video, title: 'Online Classes', desc: 'Live interactive sessions with recorded lectures', gradient: 'from-teal-500 to-cyan-400' },
                { icon: Zap, title: 'Latest Tech Stack', desc: 'Learn cutting-edge technologies used in industry', gradient: 'from-orange-500 to-amber-500' },
                { icon: Award, title: 'Certifications', desc: 'Industry-recognized certificates for your resume', gradient: 'from-pink-500 to-rose-500' }
              ].map((item, idx) => (
                <div key={idx} className="group relative bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all transform hover:-translate-y-2 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" aria-hidden="true" />
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
                 Expert Tech Mentors
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">Learn From Industry Experts</h2>
              <p className="text-lg sm:text-xl text-teal-100">Senior engineers from top tech companies</p>
            </div>
            <div className="mb-12 hidden md:block">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" alt="Tech team collaborating on project" className="rounded-3xl shadow-2xl shadow-teal-500/20 mx-auto border border-teal-500/20" loading="lazy" style={{ maxWidth: '52.5%' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { id: 1, name: 'Dr. Rajesh Kumar', specialization: 'Full Stack Development', qualification: 'M.Tech, IIT Delhi', experience: '12+ Years', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
                { id: 2, name: 'Priya Sharma', specialization: 'Data Science & AI', qualification: 'PhD in Computer Science', experience: '10+ Years', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
                { id: 3, name: 'Amit Patel', specialization: 'Cloud Computing', qualification: 'B.Tech, AWS Certified', experience: '8+ Years', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
                { id: 4, name: 'Sneha Reddy', specialization: 'Digital Marketing', qualification: 'MBA, Google Certified', experience: '7+ Years', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' }
              ].map((member) => (
                <div key={member.id} className="group bg-gradient-to-br from-white to-cyan-50 border border-teal-200/30 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all transform hover:-translate-y-3 overflow-hidden flex flex-col">
                  <div className="relative bg-gradient-to-br from-teal-600 to-cyan-500 p-8 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                    <div className="relative w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                        <img src={member.image} alt={`${member.name} - ${member.specialization} instructor`} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white relative min-h-[64px] flex items-center justify-center">{member.name}</h3>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-700 mb-4 h-12 line-clamp-2 font-semibold">{member.specialization}</p>
                    <div className="flex justify-between items-center pb-4 border-b border-teal-200/30 mb-4">
                      <span className="flex items-center text-teal-600 font-semibold text-sm">
                        <Award className="w-5 h-5 mr-2" aria-hidden="true" /> {member.qualification}
                      </span>
                      <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">{member.experience}</span>
                    </div>
                    <Link 
                      to={`/faculty/${member.id}`} 
                      className="block text-center bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-teal-500/30 transition-all mt-auto"
                    >
                      View Profile
                    </Link>
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
                 Success Stories
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">What Our Students Say</h2>
              <p className="text-lg sm:text-xl text-white/90">Join thousands of successful alumni</p>
            </div>
            <div className="mb-12 hidden md:block">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80" alt="Happy students celebrating graduation and success" className="rounded-3xl shadow-2xl shadow-teal-500/20 mx-auto border border-white/20" loading="lazy" style={{ maxWidth: '52.5%' }} />
            </div>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>

        {/* Our Students Success Stories */}
        <section className="py-20 border-t border-white/10 bg-white/5 overflow-hidden">
          <div className="w-full px-0">
            <div className="text-center mb-12 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
                Our Students
              </h2>
            </div>
            
            <div className="space-y-4">
              {[0, 1, 2].map((rowIndex) => {
                const students = [
                  { name: 'Jaya Prathyusha', role: 'Senior Tech Associate', company: 'Bank of America', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
                  { name: 'Lahari', role: 'Software Engineer', company: 'Cyient', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
                  { name: 'Maddineni Bhargava', role: 'ML Engineer (Intern)', company: 'Microsoft', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
                  { name: 'Krishna Murthy', role: 'Software Engineer', company: 'Cyient', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
                  { name: 'Shailesh', role: 'Member Technical', company: 'Zolo', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
                  { name: 'Dinesh Kumar', role: 'Software Analyst', company: 'Capgemini', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' },
                  { name: 'Surya Sai', role: 'System Engineer Trainee', company: 'Infosys', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' }
                ];
                
                return (
                  <div 
                    key={rowIndex} 
                    className={`flex gap-4 ${rowIndex === 1 ? 'animate-scroll-right' : 'animate-scroll-left'}`}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    {/* Duplicate the entire student list 3 times for seamless loop */}
                    {[...Array(3)].map((_, setIndex) => (
                      <div key={setIndex} className="flex gap-4 flex-shrink-0">
                        {students.map((student, index) => (
                          <div key={`${setIndex}-${index}`} className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-xl flex-shrink-0 w-44">
                            {/* Mobile: Horizontal Layout */}
                            <div className="flex md:hidden items-center space-x-2">
                              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal-400">
                                <img src={student.image} alt={student.name} className="w-full h-full object-cover pointer-events-none select-none" loading="lazy" draggable="false" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-semibold text-xs mb-0.5 truncate select-none">{student.name}</h4>
                                <p className="text-teal-200 text-xs mb-1 truncate select-none">{student.role}</p>
                                <div className="inline-block bg-white/20 px-2 py-0.5 rounded-full">
                                  <span className="text-white text-xs font-semibold select-none">{student.company}</span>
                                </div>
                              </div>
                            </div>
                            {/* Desktop: Vertical Layout */}
                            <div className="hidden md:flex flex-col items-center text-center">
                              <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-teal-400 group-hover:border-cyan-400 transition-colors">
                                <img src={student.image} alt={student.name} className="w-full h-full object-cover pointer-events-none select-none" loading="lazy" draggable="false" />
                              </div>
                              <h4 className="text-white font-semibold text-sm mb-1 select-none truncate w-full">{student.name}</h4>
                              <p className="text-teal-200 text-xs mb-2 select-none truncate w-full">{student.role}</p>
                              <div className="bg-white/20 px-3 py-1 rounded-full">
                                <span className="text-white text-xs font-semibold select-none">{student.company}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          
          <style jsx>{`
            @keyframes scroll-left {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-100% / 3));
              }
            }
            
            @keyframes scroll-right {
              0% {
                transform: translateX(calc(-100% / 3));
              }
              100% {
                transform: translateX(0);
              }
            }
            
            .animate-scroll-left {
              animation: scroll-left 50s linear infinite;
            }
            
            .animate-scroll-right {
              animation: scroll-right 50s linear infinite;
            }
            
            @media (max-width: 768px) {
              .animate-scroll-left {
                animation: scroll-left 35s linear infinite;
              }
              
              .animate-scroll-right {
                animation: scroll-right 35s linear infinite;
              }
            }
            
            .animate-scroll-left:hover,
            .animate-scroll-right:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-2 bg-teal-500/20 text-teal-300 rounded-full font-semibold mb-4 border border-teal-400/30">
                 Got Questions?
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-lg sm:text-xl text-teal-100">Everything you need to know about our courses</p>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  question: "What are the prerequisites for enrolling in courses?",
                  answer: "Most of our courses are designed for beginners and require no prior experience. For advanced courses, basic programming knowledge is recommended. Each course page lists specific prerequisites if any."
                },
                {
                  question: "Are the courses live or pre-recorded?",
                  answer: "We offer live interactive sessions with expert instructors, along with recorded lectures for revision. You get the best of both worlds - real-time learning and flexibility to review content anytime."
                },
                {
                  question: "What kind of placement support do you provide?",
                  answer: "We provide 100% placement assistance including resume building, mock interviews, soft skills training, and direct connections with 200+ hiring partners. Our dedicated placement team works with you until you land your dream job."
                },
                {
                  question: "How long does it take to complete a course?",
                  answer: "Course duration varies from 3 to 12 months depending on the program. Full Stack Development takes 6 months, Data Science 8 months, and specialized courses 3-4 months. You can learn at your own pace with flexible schedules."
                },
                {
                  question: "Do I get a certificate after course completion?",
                  answer: "Yes! You'll receive an industry-recognized certificate upon successful completion of the course. Our certificates are valued by top companies and can be shared on LinkedIn and your resume."
                },
                {
                  question: "What is the refund policy?",
                  answer: "We offer a 7-day money-back guarantee. If you're not satisfied with the course within the first week, you can request a full refund, no questions asked."
                },
                {
                  question: "Can I access course materials after completion?",
                  answer: "Absolutely! You get lifetime access to all course materials, including video lectures, assignments, projects, and future updates. Once enrolled, the content is yours forever."
                },
                {
                  question: "Are there any EMI or installment options available?",
                  answer: "Yes, we offer flexible payment plans including EMI options starting from ₹3,000/month. We also provide scholarships up to ₹16,000 for eligible students. Contact our admissions team for details."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-white font-semibold text-lg pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={`w-6 h-6 text-teal-300 flex-shrink-0 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-5 text-teal-100 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-14 relative overflow-hidden border-t border-white/10" style={{ marginTop: '-10px' }}>
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-0 left-0"></div>
            <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-0 right-0"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">Ready to Start Your Tech Journey?</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-10 opacity-90">Join 500+ engineering students who transformed their careers</p>
            <Link to="/student-registration" className="inline-flex items-center space-x-3 bg-white text-teal-700 px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105">
              <span>Enroll Now - It's Free</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
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
        <BrochureModal isOpen={isBrochureModalOpen} onClose={() => setIsBrochureModalOpen(false)} />
      </div>
    </ErrorBoundary>
  );
};

export default Home;
