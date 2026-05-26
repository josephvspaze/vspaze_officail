import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';
import api from '../../utils/api';
import { ListSkeleton } from '../components/SkeletonLoader';

const MyCourses = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/student/courses');
      setStudentData({ enrolledCourses: response.data.courses });
    } catch (error) {
      console.error('Error fetching courses:', error);
      setStudentData({ enrolledCourses: [] });
    } finally {
      setLoading(false);
    }
  };

  if (!studentData || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 p-6 sm:p-8 pb-24 md:pb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded w-1/4 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ListSkeleton count={3} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 p-6 sm:p-8 pb-24 md:pb-8 scroll-smooth transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">My Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentData?.enrolledCourses?.map((course, index) => (
            <div key={index} className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:border-teal-300 dark:hover:border-teal-500/30 transition-all transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{course.name || course}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-slate-400">
                  <Clock className="w-4 h-4 mr-2 text-teal-600 dark:text-teal-400" />
                  <span>6 months duration</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-slate-400">
                  <Award className="w-4 h-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                  <span>Certificate on completion</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400 mb-1">
                  <span>Progress</span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">65%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full shadow-lg" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
