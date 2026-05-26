import React, { useState, useEffect } from 'react';
import { FileText, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import api from '../../utils/api';
import { ListSkeleton } from '../components/SkeletonLoader';

const Assignments = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const profileRes = await api.get('/student/profile');
      const student = profileRes.data.student;
      setStudentData(student);
      const paid = student?.dueAmount === 0;
      setIsPaid(paid);

      if (paid) {
        try {
          const assignmentsRes = await api.get('/student/assignments');
          setAssignments(assignmentsRes.data.assignments || []);
        } catch (err) {
          console.error('Error fetching assignments:', err);
          setAssignments([]);
        }
      } else {
        setAssignments([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 p-6 sm:p-8 pb-24 md:pb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded w-1/4 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 dark:bg-slate-700 rounded-xl mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <ListSkeleton count={3} />
        </div>
      </div>
    );
  }

  if (!isPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 p-6 sm:p-8 pb-24 md:pb-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-lg p-8">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-slate-600" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Assignments Locked</h3>
            <p className="text-gray-600 dark:text-slate-400">Complete payment to access assignments</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 p-6 sm:p-8 pb-24 md:pb-8 scroll-smooth transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">My Assignments</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-lg p-6">
            <FileText className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-2" />
            <p className="text-gray-600 dark:text-slate-400 text-sm">Total Assignments</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{assignments.length}</p>
          </div>

          <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-lg p-6">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
            <p className="text-gray-600 dark:text-slate-400 text-sm">Submitted</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {assignments.filter(a => a.status === 'Submitted').length}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-lg p-6">
            <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
            <p className="text-gray-600 dark:text-slate-400 text-sm">Pending</p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {assignments.filter(a => a.status === 'Pending' || a.status === 'Not Started').length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {assignments.length > 0 ? assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl hover:border-teal-300 dark:hover:border-teal-500/30 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{assignment.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-slate-400 mb-3">{assignment.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-500">
                    <span>📚 {assignment.subject}</span>
                    <span>📅 Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    {assignment.grade && <span>📊 Grade: {assignment.grade}</span>}
                  </div>
                </div>
                <div className="flex flex-col sm:items-end space-y-2 mt-3 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    assignment.status === 'Submitted' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30' :
                    assignment.status === 'Pending' ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30' :
                    'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-400'
                  }`}>
                    {assignment.status}
                  </span>
                  {assignment.status !== 'Submitted' && (
                    <button className="flex items-center justify-center space-x-1 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:from-teal-700 hover:to-cyan-700 shadow-lg shadow-teal-500/30 text-sm w-full sm:w-auto transition-all">
                      <Upload className="w-4 h-4" />
                      <span>Submit</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-lg text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-slate-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Assignments Yet</h3>
              <p className="text-gray-600 dark:text-slate-400">Your assignments will appear here once they are created.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
