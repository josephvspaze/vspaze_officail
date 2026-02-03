import React, { useState, useEffect } from 'react';
import { X, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CountdownBanner = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Set target date to 10 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (value) => String(value).padStart(2, '0');

  if (!isVisible || isScrolled) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 border-b-2 border-yellow-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-yellow-500/20 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-3 relative z-10">
        <div className="flex items-center justify-between gap-4">
          {/* Left - Student Images */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Student" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" alt="Student" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="Student" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="Student" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
            </div>
            <span className="text-sm font-semibold text-gray-800">500+ Students Enrolled</span>
          </div>

          {/* Center - Timer and Message */}
          <div className="flex items-center justify-center gap-3 md:gap-6 flex-1">
            <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg">
              <div className="flex items-center gap-1.5 text-base md:text-lg font-bold text-gray-800 font-mono">
                <span>{formatTime(timeLeft.days)}d</span>
                <span className="animate-pulse">:</span>
                <span>{formatTime(timeLeft.hours)}h</span>
                <span className="animate-pulse">:</span>
                <span>{formatTime(timeLeft.minutes)}m</span>
                <span className="animate-pulse">:</span>
                <span>{formatTime(timeLeft.seconds)}s</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-xs md:text-sm font-bold text-gray-900">
                ENDS SOON: 20% off expert-led bootcamps
              </span>
            </div>
          </div>

          {/* Right - Register Button */}
          <button 
            onClick={() => navigate('/student-registration')}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            <LogIn className="w-4 h-4" />
            <span>Register Now</span>
          </button>

          {/* Close Button */}
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-800 hover:text-gray-900 transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner;
