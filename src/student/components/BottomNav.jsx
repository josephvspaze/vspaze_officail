import React from 'react';
import { Home, Code, Briefcase, User, Gamepad2 } from 'lucide-react';

const BottomNav = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'activities', label: 'Games', icon: Gamepad2 },
    { id: 'practice', label: 'Practice', icon: Code },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="flex justify-around items-center px-1 py-2 safe-area-inset-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl transition-all min-w-0 ${
                isActive 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-600'
              }`}
            >
              <div className={`relative ${isActive ? 'scale-110' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-600'}`} />
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-indigo-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
