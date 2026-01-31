import React, { useState } from 'react';
import { X, Video, Play, Calendar } from 'lucide-react';

const DemoModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const liveDemoSlots = [
    { id: 1, date: 'Jan 25, 2024', time: '10:00 AM - 11:00 AM' },
    { id: 2, date: 'Jan 26, 2024', time: '2:00 PM - 3:00 PM' },
    { id: 3, date: 'Jan 27, 2024', time: '4:00 PM - 5:00 PM' }
  ];

  const handleLiveDemoSelect = (slot) => {
    window.open('https://meet.google.com/your-demo-link', '_blank');
  };

  const handleRecordedDemo = () => {
    window.open('https://youtu.be/ajdRvxDWH4w?si=1ZFxG8Vstu66A3Gu', '_blank');
  };

  const handleClose = () => {
    setSelectedOption(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/30">
        <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Book Free Demo Class</h2>
          <button onClick={handleClose} className="p-2 hover:bg-slate-700 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 min-h-[200px]">
          {!selectedOption ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => setSelectedOption('live')} className="p-8 border-2 border-cyan-500/30 rounded-xl hover:border-cyan-500 hover:bg-cyan-500/10 transition-all bg-slate-700/50">
                <Video className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Live Demo</h3>
                <p className="text-cyan-200 text-sm">Join a live session with our expert</p>
              </button>

              <button onClick={() => { setSelectedOption('recorded'); handleRecordedDemo(); }} className="p-8 border-2 border-purple-500/30 rounded-xl hover:border-purple-500 hover:bg-purple-500/10 transition-all bg-slate-700/50">
                <Play className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Recorded Demo</h3>
                <p className="text-cyan-200 text-sm">Watch pre-recorded demo anytime</p>
              </button>
            </div>
          ) : selectedOption === 'live' ? (
            <div>
              <button onClick={() => setSelectedOption(null)} className="text-cyan-400 hover:text-cyan-300 mb-4 font-semibold">← Back</button>
              <h3 className="text-xl font-semibold text-white mb-4">Select a Time Slot</h3>
              <div className="space-y-3">
                {liveDemoSlots.map((slot) => (
                  <button key={slot.id} onClick={() => handleLiveDemoSelect(slot)} className="w-full p-4 border-2 border-cyan-500/30 rounded-xl hover:border-cyan-500 hover:bg-cyan-500/10 transition-all text-left bg-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{slot.date}</p>
                        <p className="text-cyan-200">{slot.time}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">Available</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DemoModal;