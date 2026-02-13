import React, { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';

const ContactPopup = ({ onClose }) => {
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    area: '',
    qualification: '',
    message: ''
  });

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210', '_blank');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage or send to API
    const callbacks = JSON.parse(localStorage.getItem('callback_requests') || '[]');
    callbacks.push({
      ...formData,
      requestedAt: new Date().toISOString()
    });
    localStorage.setItem('callback_requests', JSON.stringify(callbacks));
    
    setShowCallbackForm(false);
    setShowSuccessMessage(true);
    setFormData({ name: '', mobile: '', area: '', qualification: '', message: '' });
  };

  if (showSuccessMessage) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center relative border border-teal-400" style={{boxShadow: '0 0 25px rgba(20, 184, 166, 0.4)'}}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-teal-400">
              <MessageSquare className="w-10 h-10 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 text-lg mb-2">
              We received your request successfully.
            </p>
            <p className="text-teal-600 font-semibold text-lg">
              We will call you back soon!
            </p>
          </div>
        </div>
      </>
    );
  }

  if (showCallbackForm) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setShowCallbackForm(false)} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCallbackForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Request a Callback</h2>
            <p className="text-gray-600 text-center mb-6">Fill in your details and we'll get back to you</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter your area"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualification <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.qualification}
                  onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                  required
                >
                  <option value="">Select qualification</option>
                  <option value="10th">10th</option>
                  <option value="Intermediate (10+2)">Intermediate (10+2)</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Any specific query or course interest?"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden pointer-events-auto animate-slideUp relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-gradient-to-br from-orange-100 to-orange-50">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" 
                alt="Career Expert"
                className="w-full h-64 md:h-full object-contain"
              />
            </div>
            
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Talk to Our Career Expert</h2>
              <p className="text-gray-600 mb-6">We'd love to hear from you</p>
              
              <div className="space-y-3">
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </button>
                
                <button
                  onClick={() => setShowCallbackForm(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  Request a Call Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

export default ContactPopup;
