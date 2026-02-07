import React, { useState } from 'react';
import { TrendingUp, MapPin, Calendar, ExternalLink, Play, Award, Users, Building } from 'lucide-react';

const SuccessStories = () => {
  const [activeTab, setActiveTab] = useState('recent');

  const recentPlacements = [
    { name: 'Rahul Sharma', course: 'Full Stack Development', company: 'TCS', package: '₹8.5 LPA', location: 'Bangalore', days: 2 },
    { name: 'Priya Patel', course: 'Data Science', company: 'Infosys', package: '₹12 LPA', location: 'Pune', days: 5 },
    { name: 'Amit Kumar', course: 'Cloud Computing', company: 'Wipro', package: '₹9.2 LPA', location: 'Hyderabad', days: 8 },
    { name: 'Sneha Reddy', course: 'Digital Marketing', company: 'Accenture', package: '₹7.8 LPA', location: 'Chennai', days: 12 }
  ];

  const successStories = [
    {
      name: 'Vikram Singh',
      course: 'Full Stack Development',
      beforeSalary: '₹3.2 LPA',
      afterSalary: '₹12 LPA',
      company: 'Microsoft',
      duration: '6 months',
      story: 'From a struggling fresher to Microsoft developer. Vspaze transformed my career completely.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      linkedin: '#'
    },
    {
      name: 'Anjali Gupta',
      course: 'Data Science & AI',
      beforeSalary: '₹4 LPA',
      afterSalary: '₹15 LPA',
      company: 'Amazon',
      duration: '8 months',
      story: 'Switched from manual testing to AI engineer. Best decision of my career!',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      linkedin: '#'
    },
    {
      name: 'Rohit Mehta',
      course: 'Cloud Computing',
      beforeSalary: '₹5 LPA',
      afterSalary: '₹18 LPA',
      company: 'Google',
      duration: '5 months',
      story: 'From support engineer to cloud architect at Google. Dreams do come true!',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      linkedin: '#'
    }
  ];

  const hiringPartners = [
    { name: 'TCS', logo: '/logo.webp', hasLogo: true },
    { name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg', hasLogo: true },
    { name: 'Wipro', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg', hasLogo: true },
    { name: 'Accenture', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg', hasLogo: true },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', hasLogo: true },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', hasLogo: true },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', hasLogo: true },
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', hasLogo: true }
  ];

  const placementStats = [
    { metric: '95%', label: 'Placement Rate', icon: TrendingUp },
    { metric: '₹8.5L', label: 'Average Package', icon: Award },
    { metric: '500+', label: 'Students Placed', icon: Users },
    { metric: '50+', label: 'Hiring Partners', icon: Building }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-500 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Success Stories</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Real students, real transformations, real career growth
          </p>
        </div>
      </section>

      {/* Live Placement Stats */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Placement Statistics</h2>
            <p className="text-xl text-gray-600">Numbers that speak for themselves</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {placementStats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all border border-teal-400" style={{boxShadow: '0 0 15px rgba(20, 184, 166, 0.2)'}}>
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.metric}</h3>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Placements Ticker */}
      <section className="py-4 md:py-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Recent Placements (Last 30 Days)</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentPlacements.map((placement, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-teal-400" style={{boxShadow: '0 0 15px rgba(20, 184, 166, 0.2)'}}>
                <h4 className="font-bold text-lg mb-1">{placement.name}</h4>
                <p className="text-sm opacity-90 mb-3">{placement.course}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-yellow-300 text-lg">{placement.package}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{placement.days} days ago</span>
                </div>
                <div className="flex items-center mb-2 text-sm opacity-90">
                  <Building className="w-4 h-4 mr-1" />
                  <span className="font-semibold">{placement.company}</span>
                </div>
                <div className="flex items-center text-sm opacity-80">
                  <MapPin className="w-4 h-4 mr-1" />
                  {placement.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-10 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Career Transformation Stories</h2>
            <p className="text-xl text-gray-600">See how our students transformed their careers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden border border-teal-400" style={{boxShadow: '0 0 15px rgba(20, 184, 166, 0.2)'}}>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={story.image} alt={story.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                      <p className="text-teal-600 font-semibold text-sm">{story.course}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-50 to-green-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Before</p>
                        <p className="text-lg font-bold text-red-600">{story.beforeSalary}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600" />
                      <div className="text-center">
                        <p className="text-sm text-gray-600">After</p>
                        <p className="text-lg font-bold text-green-600">{story.afterSalary}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Building className="w-4 h-4 mr-2 text-teal-600" />
                      <span className="font-semibold">{story.company}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-teal-600" />
                      <span>Completed in {story.duration}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 italic mb-4 text-sm leading-relaxed">"{story.story}"</p>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <a href={story.linkedin} className="inline-flex items-center text-teal-600 hover:text-teal-800 font-semibold text-sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Hiring Partners</h2>
            <p className="text-xl text-gray-600">Top companies that hire our students</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {hiringPartners.map((company, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex flex-col items-center justify-center h-40 border-2 border-gray-200">
                {company.hasLogo ? (
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="w-full h-20 object-contain mb-3"
                    style={{mixBlendMode: 'multiply'}}
                  />
                ) : (
                  <div className="w-full h-20 bg-gradient-to-br from-teal-600 to-cyan-500 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white font-bold text-lg">{company.name}</span>
                  </div>
                )}
                <p className="font-semibold text-gray-900 text-center text-sm">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-12 bg-gradient-to-r from-teal-900 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-xl mb-8 opacity-90">Join 500+ students who transformed their careers with us</p>
          <a
            href="/student-registration"
            className="inline-flex items-center space-x-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <span>Start Your Journey</span>
            <TrendingUp className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
