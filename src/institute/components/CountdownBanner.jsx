import { useState, useEffect, memo } from 'react';
import { X, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CountdownBanner = memo(() => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 20);

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
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsHidden(lastScrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (value) => String(value).padStart(2, '0');

  if (!isVisible) return null;

  return (
    <div 
      className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 border-b-2 border-yellow-600 relative"
      style={{
        maxHeight: isHidden ? '0px' : '100px',
        opacity: isHidden ? 0 : 1,
        transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        borderBottomWidth: isHidden ? '0px' : '2px'
      }}
    >
      <div className="absolute inset-0 bg-yellow-500/10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 relative z-10">
        {/* Mobile & Tablet Layout (< 1024px) */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="bg-white rounded-lg px-2 py-1 shadow-lg">
              <div className="flex items-center gap-1 text-xs font-bold text-gray-800 font-mono">
                <span>{formatTime(timeLeft.days)}d</span>
                <span>:</span>
                <span>{formatTime(timeLeft.hours)}h</span>
                <span>:</span>
                <span>{formatTime(timeLeft.minutes)}m</span>
                <span>:</span>
                <span>{formatTime(timeLeft.seconds)}s</span>
              </div>
            </div>

            <button 
              onClick={() => setIsVisible(false)}
              className="text-gray-800 hover:text-gray-900 transition-colors flex-shrink-0"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-gray-900 flex-1">
              20% Off Expert-Led Bootcamps
            </span>
            <button 
              onClick={() => navigate('/student-registration')}
              className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:shadow-xl transition-all hover:scale-105 flex-shrink-0 whitespace-nowrap"
            >
              <LogIn className="w-3 h-3" />
              <span>Register</span>
            </button>
          </div>
        </div>

        {/* Desktop Layout (>= 1024px) */}
        <div className="hidden lg:flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Student" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" alt="Student" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="Student" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="Student" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
            </div>
            <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">500+ Students Enrolled</span>
          </div>

          <div className="flex items-center justify-center gap-6 flex-1">
            <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg">
              <div className="flex items-center gap-1.5 text-lg font-bold text-gray-800 font-mono">
                <span>{formatTime(timeLeft.days)}d</span>
                <span>:</span>
                <span>{formatTime(timeLeft.hours)}h</span>
                <span>:</span>
                <span>{formatTime(timeLeft.minutes)}m</span>
                <span>:</span>
                <span>{formatTime(timeLeft.seconds)}s</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
                Ends Soon: 20% Off Expert-Led Bootcamps
              </span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/student-registration')}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap"
          >
            <LogIn className="w-4 h-4" />
            <span>Register Now</span>
          </button>

          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-800 hover:text-gray-900 transition-colors"
            aria-label="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
});

CountdownBanner.displayName = 'CountdownBanner';

export default CountdownBanner;
