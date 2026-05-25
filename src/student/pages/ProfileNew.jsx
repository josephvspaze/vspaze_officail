import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, BookOpen, Users, CreditCard, ChevronRight, MessageSquare, LogOut } from 'lucide-react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const ProfileNew = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/student/profile');
        setStudent(res.data.student);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('student_auth');
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400" />
    </div>
  );

  const initials = student?.name?.split(' ').map(n => n[0]).join('') || 'S';
  const payPercent = student?.totalFee > 0 ? Math.round((student.paidAmount / student.totalFee) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 px-4 pt-6 pb-10">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl shadow-teal-500/30">
            <span className="text-white font-bold text-2xl">{initials}</span>
          </div>
          <h2 className="text-white font-bold text-xl">{student?.name || '—'}</h2>
          <p className="text-teal-400 text-sm mt-0.5">{student?.email || '—'}</p>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${
            student?.status === 'active'
              ? 'bg-green-500/20 text-green-400 border-green-500/30'
              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
          }`}>
            {student?.status?.charAt(0).toUpperCase() + student?.status?.slice(1) || 'Pending'}
          </span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4 space-y-4">

        {/* Info Card */}
        <div className="bg-slate-800 border border-teal-500/20 rounded-2xl p-4 space-y-3">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Personal Info</h3>
          {[
            { icon: User,    label: 'Full Name', value: student?.name },
            { icon: Mail,    label: 'Email',     value: student?.email },
            { icon: Phone,   label: 'Phone',     value: student?.phone || 'Not set' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <p className="text-slate-500 text-xs">{label}</p>
                <p className="text-white text-sm font-medium">{value || '—'}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enrollment Card */}
        <div className="bg-slate-800 border border-teal-500/20 rounded-2xl p-4 space-y-3">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Enrollment</h3>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-slate-500 text-xs">Course</p>
              <p className="text-white text-sm font-medium">
                {student?.enrolledCourses?.length > 0
                  ? student.enrolledCourses.map(c => c.name || c).join(', ')
                  : 'Not enrolled'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <p className="text-slate-500 text-xs">Batch</p>
              <p className="text-white text-sm font-medium">{student?.batch?.name || 'Not assigned'}</p>
            </div>
          </div>
          {student?.joinDate && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-slate-500 text-xs">Joined</p>
                <p className="text-white text-sm font-medium">
                  {new Date(student.joinDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Payment Card */}
        <div className="bg-slate-800 border border-teal-500/20 rounded-2xl p-4">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Payment Status</h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              { label: 'Total Fee',    value: `₹${(student?.totalFee || 0).toLocaleString()}`,  color: 'text-white' },
              { label: 'Paid',         value: `₹${(student?.paidAmount || 0).toLocaleString()}`, color: 'text-green-400' },
              { label: 'Due',          value: `₹${(student?.dueAmount || 0).toLocaleString()}`,  color: student?.dueAmount > 0 ? 'text-red-400' : 'text-green-400' },
            ].map(s => (
              <div key={s.label} className="bg-slate-700/50 rounded-xl p-3 text-center">
                <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all"
              style={{ width: `${payPercent}%` }} />
          </div>
          <p className="text-slate-500 text-xs mt-1 text-right">{payPercent}% paid</p>
        </div>

        {/* Support */}
        <div className="bg-gradient-to-br from-teal-900/50 to-cyan-900/50 border border-teal-500/20 rounded-2xl p-4">
          <h3 className="text-white font-semibold text-sm mb-3">Need Help?</h3>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm">WhatsApp Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </a>
          <a href="mailto:support@vspaze.com"
            className="flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors mt-2">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="text-white text-sm">Email Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Logout */}
        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-2xl font-semibold text-sm transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>

      </div>
    </div>
  );
};

export default ProfileNew;
