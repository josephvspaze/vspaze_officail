import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, CheckCircle, Clock, Award } from 'lucide-react';
import api from '../../utils/api';
import { DashboardSkeleton } from '../components/SkeletonLoader';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const profileRes = await api.get('/student/profile');
      const student = profileRes.data.student;
      setStudentData(student);
      const paid = student?.dueAmount === 0;
      setIsPaid(paid);

      if (paid) {
        try {
          const [assignmentsRes, testsRes] = await Promise.all([
            api.get('/student/assignments'),
            api.get('/student/tests')
          ]);
          setAssignments(assignmentsRes.data.assignments || []);
          setTests(testsRes.data.tests || []);
        } catch (err) {
          console.error('Error fetching assignments/tests:', err);
          setAssignments([]);
          setTests([]);
        }
      } else {
        setAssignments([]);
        setTests([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !studentData) {
    return <DashboardSkeleton />;
  }

  const stats = [
    { title: 'Enrolled Courses', value: studentData.enrolledCourses?.length || 0, icon: BookOpen, color: 'from-teal-500 to-cyan-600', bgColor: 'bg-teal-50' },
    { title: 'Assignments', value: isPaid ? assignments.length : 'Locked', icon: CheckCircle, color: 'from-green-500 to-teal-600', bgColor: 'bg-green-50' },
    { title: 'Tests', value: isPaid ? tests.length : 'Locked', icon: Calendar, color: 'from-purple-500 to-pink-600', bgColor: 'bg-purple-50' },
    { title: 'Pending', value: isPaid ? assignments.filter(a => !a.submitted).length : 'Locked', icon: Clock, color: 'from-orange-500 to-amber-600', bgColor: 'bg-orange-50' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 scroll-smooth transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">{studentData.name}</span>!
              </h1>
              <p className="text-gray-600 dark:text-slate-400 text-base sm:text-lg">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            {isPaid && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-full shadow-lg shadow-teal-500/30">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Active Student</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment Alert */}
        {!isPaid && (
          <div className="bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 dark:from-red-900/40 dark:via-orange-900/40 dark:to-red-900/40 border border-orange-300 dark:border-red-500/30 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-orange-500/20 dark:bg-red-500/20 rounded-full flex items-center justify-center border border-orange-400 dark:border-red-500/30">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">Complete Payment to Unlock Full Access</h3>
                <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base">Pay <span className="font-bold text-orange-700 dark:text-red-400">₹{studentData.dueAmount?.toLocaleString()}</span> to access all course materials, assignments, and features</p>
              </div>
              <button className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-lg shadow-orange-500/30 text-sm sm:text-base">
                Pay Now
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats Summary */}
        {isPaid && (
          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 border border-teal-300 dark:border-teal-500/30 rounded-2xl p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-700 dark:text-teal-400">{studentData.enrolledCourses?.length || 0}</p>
                <p className="text-sm text-gray-600 dark:text-slate-400">Active Courses</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">{assignments.filter(a => a.status === 'Submitted').length}/{assignments.length}</p>
                <p className="text-sm text-gray-600 dark:text-slate-400">Assignments Done</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">{tests.length}</p>
                <p className="text-sm text-gray-600 dark:text-slate-400">Tests Available</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{assignments.filter(a => a.status === 'Pending' || a.status === 'Not Started').length}</p>
                <p className="text-sm text-gray-600 dark:text-slate-400">Pending Tasks</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:border-teal-300 dark:hover:border-teal-500/30 transition-all duration-300 p-5 sm:p-6 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {!isPaid && stat.value === 'Locked' && (
                    <span className="text-xs bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-400 px-2 py-1 rounded-full">🔒</span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-slate-400 text-sm font-medium mb-2">{stat.title}</p>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6">
          {/* Assignments */}
          <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-lg p-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                Assignments
              </h3>
              <span className="text-sm text-gray-600 dark:text-slate-400 bg-gray-100 dark:bg-slate-700/50 px-3 py-1 rounded-full">
                {isPaid ? assignments.length : '🔒'}
              </span>
            </div>
            {!isPaid ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🔒</div>
                <p className="text-gray-600 dark:text-slate-400">Complete payment to view assignments</p>
              </div>
            ) : assignments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-slate-500">No assignments yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto scroll-smooth">
                {assignments.slice(0, 5).map((assignment, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-green-200 dark:border-green-500/20 hover:border-green-300 dark:hover:border-green-500/40 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{assignment.title}</h4>
                      <span className="text-xs bg-green-200 dark:bg-green-500/20 text-green-800 dark:text-green-400 px-2 py-1 rounded-full border border-green-300 dark:border-green-500/30">New</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400 mb-2">{assignment.course?.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-500">
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      <span className="font-semibold text-teal-600 dark:text-teal-400">{assignment.totalMarks} marks</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tests */}
          <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-lg p-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                Tests
              </h3>
              <span className="text-sm text-gray-600 dark:text-slate-400 bg-gray-100 dark:bg-slate-700/50 px-3 py-1 rounded-full">
                {isPaid ? tests.length : '🔒'}
              </span>
            </div>
            {!isPaid ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🔒</div>
                <p className="text-gray-600 dark:text-slate-400">Complete payment to view tests</p>
              </div>
            ) : tests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-slate-500">No tests yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto scroll-smooth">
                {tests.slice(0, 5).map((test, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-500/40 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{test.title}</h4>
                      <span className="text-xs bg-purple-200 dark:bg-purple-500/20 text-purple-800 dark:text-purple-400 px-2 py-1 rounded-full border border-purple-300 dark:border-purple-500/30">New</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400 mb-2">{test.course?.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-500">
                      <span>Date: {new Date(test.date).toLocaleDateString()}</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">{test.duration} min</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
