import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScholarshipPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Don't show popup on contact page
    if (window.location.pathname === '/contact') {
      return;
    }
    
    // Show popup after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={() => setIsVisible(false)}
      />

      {/* Popup Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden pointer-events-auto animate-slideUp relative max-h-[85vh] md:max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
            aria-label="Close popup"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="md:w-2/5 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100"></div>
              <div className="relative h-full flex items-center justify-center p-4 sm:p-6 min-h-[200px] md:min-h-[500px]">
                <div className="text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto mb-3 sm:mb-4 md:mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" 
                      alt="Lavanya Nasana - Associate Software Engineer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 sm:p-3 md:p-4 shadow-lg">
                    <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                      <span className="font-bold text-gray-900 text-sm sm:text-base md:text-lg">Lavanya Nasana</span>
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Associate Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Content */}
            <div className="md:w-3/5 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
              <div className="text-center mb-3 sm:mb-4 md:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3">
                  Upto <span className="text-blue-600">₹16,000/-</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3 md:mb-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Scholarship</h3>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-500 fill-yellow-500" />
                </div>
                
                <div className="inline-block bg-purple-100 text-purple-700 px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 md:mb-6">
                  Price for Post-paid
                </div>

                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                  <span className="text-gray-400 line-through text-base sm:text-lg md:text-xl">₹55,000/-</span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">₹39,000/-</span>
                </div>
              </div>

              {/* Testimonial Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6 text-white shadow-lg">
                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-blue-50">
                  Program fee is 100% justified. It includes teaching industry ready skills, placement assistance and more. This is the best platform to kick-start your tech career.
                </p>
              </div>

              {/* Urgency Message */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 md:mb-6 text-orange-600 font-bold text-sm sm:text-base md:text-lg">
                <span className="text-xl sm:text-2xl md:text-3xl">🔥</span>
                <span>Only few Seats Left!</span>
              </div>

              {/* CTA Button */}
              <Link
                to="/student-registration"
                onClick={() => setIsVisible(false)}
                className="block w-full bg-blue-600 text-white text-center py-2.5 sm:py-3 md:py-4 rounded-xl font-bold text-base sm:text-lg md:text-xl hover:bg-blue-700 transition-all hover:shadow-xl"
              >
                Claim now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default ScholarshipPopup;
