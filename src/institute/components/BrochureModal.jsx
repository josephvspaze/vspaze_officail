import React, { useState } from 'react';
import { X, Download, Code, Database, Megaphone, Cloud, Palette, BookOpen, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react';

const BrochureModal = ({ isOpen, onClose }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    { 
      id: 1, 
      name: 'Full Stack Development', 
      icon: Code,
      description: 'Master MERN Stack, React, Node.js & more',
      color: 'cyan'
    },
    { 
      id: 2, 
      name: 'Data Science & AI', 
      icon: Database,
      description: 'Python, Machine Learning, Deep Learning',
      color: 'purple'
    },
    { 
      id: 3, 
      name: 'Digital Marketing', 
      icon: Megaphone,
      description: 'SEO, Social Media, Content Marketing',
      color: 'orange'
    },
    { 
      id: 4, 
      name: 'Cloud Computing', 
      icon: Cloud,
      description: 'AWS, Azure, DevOps & Cloud Architecture',
      color: 'teal'
    },
    { 
      id: 5, 
      name: 'UI/UX Design', 
      icon: Palette,
      description: 'Figma, Adobe XD, User Research',
      color: 'pink'
    },
    { 
      id: 6, 
      name: 'Python Programming', 
      icon: Code,
      description: 'Core Python, Django, Flask & Automation',
      color: 'yellow'
    }
  ];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/brochure.pdf';
    link.download = `Vspaze-${selectedCourse.name.replace(/\s+/g, '-')}-Brochure.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setSelectedCourse(null);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setSelectedCourse(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/30">
        <div className="p-4 sm:p-6 border-b border-cyan-500/20 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Download Course Brochure</h2>
          <button onClick={handleClose} className="p-2 hover:bg-slate-700 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4 sm:p-6 min-h-[200px]">
          {!selectedCourse ? (
            <>
              <p className="text-cyan-200 mb-6 text-center text-sm sm:text-base">Select a course to download detailed information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {courses.map((course) => {
                  const IconComponent = course.icon;
                  const colorMap = {
                    cyan: { border: 'border-cyan-500/30', hoverBorder: 'hover:border-cyan-500', hoverBg: 'hover:bg-cyan-500/10', icon: 'text-cyan-400', text: 'text-cyan-400' },
                    purple: { border: 'border-purple-500/30', hoverBorder: 'hover:border-purple-500', hoverBg: 'hover:bg-purple-500/10', icon: 'text-purple-400', text: 'text-purple-400' },
                    orange: { border: 'border-orange-500/30', hoverBorder: 'hover:border-orange-500', hoverBg: 'hover:bg-orange-500/10', icon: 'text-orange-400', text: 'text-orange-400' },
                    teal: { border: 'border-teal-500/30', hoverBorder: 'hover:border-teal-500', hoverBg: 'hover:bg-teal-500/10', icon: 'text-teal-400', text: 'text-teal-400' },
                    pink: { border: 'border-pink-500/30', hoverBorder: 'hover:border-pink-500', hoverBg: 'hover:bg-pink-500/10', icon: 'text-pink-400', text: 'text-pink-400' },
                    yellow: { border: 'border-yellow-500/30', hoverBorder: 'hover:border-yellow-500', hoverBg: 'hover:bg-yellow-500/10', icon: 'text-yellow-400', text: 'text-yellow-400' }
                  };
                  const colors = colorMap[course.color];
                  
                  return (
                    <button 
                      key={course.id} 
                      onClick={() => setSelectedCourse(course)} 
                      className={`p-4 sm:p-6 border-2 ${colors.border} ${colors.hoverBorder} ${colors.hoverBg} rounded-xl transition-all bg-slate-700/50 text-left`}
                    >
                      <IconComponent className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.icon} mb-3 sm:mb-4`} />
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{course.name}</h3>
                      <p className="text-cyan-200 text-xs sm:text-sm mb-3">{course.description}</p>
                      <div className={`flex items-center ${colors.text} text-xs sm:text-sm`}>
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        <span>Get Brochure</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div>
              <button 
                onClick={() => setSelectedCourse(null)} 
                className="text-cyan-400 hover:text-cyan-300 mb-4 sm:mb-6 font-semibold flex items-center text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </button>

              <div className="bg-slate-700/50 rounded-xl p-4 sm:p-6 border border-cyan-500/20">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                  {(() => {
                    const colorMap = {
                      cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', icon: 'text-cyan-400', button: 'from-cyan-500 to-cyan-600' },
                      purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', icon: 'text-purple-400', button: 'from-purple-500 to-purple-600' },
                      orange: { bg: 'bg-orange-500/20', border: 'border-orange-500/30', icon: 'text-orange-400', button: 'from-orange-500 to-orange-600' },
                      teal: { bg: 'bg-teal-500/20', border: 'border-teal-500/30', icon: 'text-teal-400', button: 'from-teal-500 to-teal-600' },
                      pink: { bg: 'bg-pink-500/20', border: 'border-pink-500/30', icon: 'text-pink-400', button: 'from-pink-500 to-pink-600' },
                      yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', icon: 'text-yellow-400', button: 'from-yellow-500 to-yellow-600' }
                    };
                    const colors = colorMap[selectedCourse.color];
                    
                    return (
                      <>
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 ${colors.bg} rounded-xl flex items-center justify-center border ${colors.border} flex-shrink-0`}>
                          {React.createElement(selectedCourse.icon, { 
                            className: `w-8 h-8 sm:w-10 sm:h-10 ${colors.icon}` 
                          })}
                        </div>
                        <div className="text-center sm:text-left flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedCourse.name}</h3>
                          <p className="text-cyan-200 text-sm sm:text-base">{selectedCourse.description}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 sm:p-6 mb-6 border border-cyan-500/10">
                  <div className="flex items-start gap-3 mb-4">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold mb-2 text-sm sm:text-base">Your Journey Starts Here!</p>
                      <p className="text-cyan-200 text-xs sm:text-sm leading-relaxed">
                        Download our comprehensive brochure to discover how this course can transform your career.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      'Complete curriculum details',
                      'Fee structure & payment options',
                      'Placement assistance details',
                      'Success stories & testimonials'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                        <span className="text-cyan-200 text-xs sm:text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {(() => {
                  const colorMap = {
                    cyan: 'from-cyan-500 to-cyan-600',
                    purple: 'from-purple-500 to-purple-600',
                    orange: 'from-orange-500 to-orange-600',
                    teal: 'from-teal-500 to-teal-600',
                    pink: 'from-pink-500 to-pink-600',
                    yellow: 'from-yellow-500 to-yellow-600'
                  };
                  const gradient = colorMap[selectedCourse.color];
                  
                  return (
                    <button
                      onClick={handleDownload}
                      className={`w-full bg-gradient-to-r ${gradient} text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 group`}
                    >
                      <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                      <span>Download Brochure Now</span>
                    </button>
                  );
                })()}

                <p className="text-cyan-300 text-center mt-4 text-xs sm:text-sm">
                  💡 Take the first step towards your dream career!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrochureModal;
