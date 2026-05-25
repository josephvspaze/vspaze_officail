import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Users } from 'lucide-react';
import api from '../../utils/api';

const Attendance = () => {
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/student/profile');
        setStudent(res.data.student);
        // Attendance records will come from API when implemented
        // For now show empty state with real student info
        setAttendance([]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400" />
    </div>
  );

  const isPaid = student?.dueAmount === 0;
  const present = attendance.filter(a => a.status === 'present').length;
  const absent  = attendance.filter(a => a.status === 'absent').length;
  const total   = attendance.length;
  const percent = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

  if (!isPaid) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-red-500/20 rounded-2xl p-8 text-center max-w-sm">
          <Calendar className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h3 className="text-white font-bold text-lg mb-2">Attendance Locked</h3>
          <p className="text-slate-400 text-sm">Complete your payment to access attendance records.</p>
          <p className="text-red-400 font-semibold mt-2">₹{student?.dueAmount?.toLocaleString()} due</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 px-4 pt-6 pb-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-white font-bold text-xl mb-1">Attendance</h1>
          <p className="text-slate-400 text-sm">
            {student?.batch?.name || 'Your batch'} · {student?.enrolledCourses?.[0]?.name || ''}
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-2 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Total',    value: total,    icon: Calendar,     color: 'text-white' },
            { label: 'Present',  value: present,  icon: CheckCircle,  color: 'text-green-400' },
            { label: 'Absent',   value: absent,   icon: XCircle,      color: 'text-red-400' },
            { label: 'Rate',     value: `${percent}%`, icon: Clock,   color: 'text-teal-400' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-slate-800 border border-slate-700/50 rounded-2xl p-3 text-center">
                <Icon className={`w-4 h-4 ${s.color} mx-auto mb-1`} />
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                <p className="text-slate-500 text-[10px]">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        {total > 0 && (
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-4">
            <div className="flex justify-between mb-2">
              <span className="text-slate-400 text-xs">Attendance Rate</span>
              <span className="text-teal-400 text-xs font-bold">{percent}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className={`h-2 rounded-full transition-all ${
                parseFloat(percent) >= 75 ? 'bg-gradient-to-r from-teal-500 to-cyan-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
              }`} style={{ width: `${percent}%` }} />
            </div>
            {parseFloat(percent) < 75 && (
              <p className="text-red-400 text-xs mt-2">⚠ Attendance below 75% — please attend more classes</p>
            )}
          </div>
        )}

        {/* Records */}
        {attendance.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-10 text-center">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-semibold">No attendance records yet</p>
            <p className="text-slate-500 text-sm mt-1">Records will appear here once your batch classes begin.</p>
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700/50">
              <h3 className="text-white font-semibold text-sm">Attendance Records</h3>
            </div>
            <div className="divide-y divide-slate-700/50">
              {attendance.map((record, idx) => (
                <div key={idx} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-white text-sm font-medium">{record.subject || record.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {new Date(record.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${
                    record.status === 'present'
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}>
                    {record.status === 'present'
                      ? <><CheckCircle className="w-3 h-3" /> Present</>
                      : <><XCircle className="w-3 h-3" /> Absent</>
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
