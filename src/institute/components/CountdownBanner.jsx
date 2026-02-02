import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CountdownBanner = () => {
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
      
      <div className="max-w-7xl mx-auto px-4 py-1.5 relative z-10">
        <div className="flex items-center justify-center gap-3 md:gap-6">
          {/* Timer Display */}
          <div className="bg-white rounded-lg px-3 py-1 shadow-lg">
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

          {/* Message */}
          <div className="text-center">
            <span className="text-xs md:text-sm font-bold text-gray-900">
              ENDS SOON: 20% off expert-led bootcamps
            </span>
          </div>

          {/* Close Button */}
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-800 hover:text-gray-900 transition-colors ml-2"
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
