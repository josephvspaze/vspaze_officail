import React, { useState, useEffect } from 'react';
import { Play, Lock, CheckCircle, ChevronDown, ChevronRight, BookMarked, Plus, Save, X } from 'lucide-react';
import api from '../../utils/api';

const CourseContent = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [batchName, setBatchName] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [videoNotes, setVideoNotes] = useState([]);
  const [videoStartTime, setVideoStartTime] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Load notes for current video
    if (selectedVideo) {
      const allNotes = JSON.parse(localStorage.getItem('student_notes') || '[]');
      const currentVideoNotes = allNotes.filter(note => note.videoId === selectedVideo.id);
      setVideoNotes(currentVideoNotes);
    }
  }, [selectedVideo]);

  const fetchData = async () => {
    try {
      const [profileRes, videosRes] = await Promise.all([
        api.get('/student/profile'),
        api.get('/student/videos')
      ]);
      const student = profileRes.data.student;
      setStudentData(student);
      setIsPaid(student?.dueAmount === 0);
      setCourseData({ videos: videosRes.data.videos || [], syllabus: videosRes.data.syllabus || [] });
      setBatchName(videosRes.data.batchName || null);
      setCourseName(videosRes.data.courseName || '');
      if (videosRes.data.videos?.length > 0) setExpandedModules({ 1: true });
    } catch (error) {
      console.error('Error fetching data:', error);
      setStudentData({ name: 'Student', dueAmount: 0 });
      setCourseData({ videos: [], syllabus: [] });
    }
  };

  const videosByModule = {};
  courseData?.videos?.forEach(video => {
    if (!videosByModule[video.module]) {
      videosByModule[video.module] = [];
    }
    videosByModule[video.module].push(video);
  });

  const courseModules = Object.keys(videosByModule).map((moduleName, index) => ({
    id: index + 1,
    title: moduleName,
    topics: videosByModule[moduleName].map((video) => ({
      id: video._id,
      title: video.title,
      url: video.url,
      completed: false
    }))
  }));

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleVideoClick = (topic) => {
    if (isPaid) {
      setSelectedVideo(topic);
      setShowNotes(false);
      setCurrentNote('');
      setVideoStartTime(Date.now());
    }
  };

  const getCurrentTimestamp = () => {
    if (!videoStartTime) return '0:00';
    
    const elapsedSeconds = Math.floor((Date.now() - videoStartTime) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSaveNote = () => {
    if (!currentNote.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      videoId: selectedVideo.id,
      videoTitle: selectedVideo.title,
      content: currentNote,
      timestamp: getCurrentTimestamp(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const allNotes = JSON.parse(localStorage.getItem('student_notes') || '[]');
    allNotes.unshift(newNote);
    localStorage.setItem('student_notes', JSON.stringify(allNotes));

    setVideoNotes([newNote, ...videoNotes]);
    setCurrentNote('');
    alert('Note saved successfully!');
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Delete this note?')) {
      const allNotes = JSON.parse(localStorage.getItem('student_notes') || '[]');
      const updatedNotes = allNotes.filter(note => note.id !== noteId);
      localStorage.setItem('student_notes', JSON.stringify(updatedNotes));
      setVideoNotes(videoNotes.filter(note => note.id !== noteId));
    }
  };

  if (!studentData || !courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (!isPaid) {
    return (
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-8 text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Locked</h2>
          <p className="text-gray-700 mb-6">
            Please complete your payment to access the course content
          </p>
          <div className="bg-white rounded-lg p-4 mb-6 inline-block">
            <p className="text-sm text-gray-600">Pending Amount</p>
            <p className="text-3xl font-bold text-red-600">₹{studentData.dueAmount}</p>
          </div>
          <p className="text-gray-600 mb-4">Go to Payments section to complete your enrollment</p>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Preview</h3>
          <div className="space-y-4">
            {courseModules.length > 0 ? (
              courseModules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg p-4 opacity-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{module.title}</h4>
                        <p className="text-sm text-gray-600">{module.topics.length} topics • {module.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No course content available</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 pb-24 md:pb-8">
      {/* Course & Batch Info Header */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        {courseName && (
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <BookMarked className="w-4 h-4 text-blue-600" />
            <span className="text-blue-800 font-semibold text-sm">{courseName}</span>
          </div>
        )}
        {batchName && (
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-lg px-4 py-2">
            <span className="text-teal-700 text-xs font-semibold uppercase tracking-wider">Batch:</span>
            <span className="text-teal-800 font-semibold text-sm">{batchName}</span>
          </div>
        )}
      </div>

      {courseModules.length === 0 && (!courseData?.videos || courseData.videos.length === 0) ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-600 mb-4">No course content available yet.</p>
          <p className="text-sm text-gray-500">Videos will be added soon by the instructor.</p>
        </div>
      ) : courseModules.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-600 mb-4">Loading videos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="lg:col-span-3 order-2 lg:order-1">
          {selectedVideo ? (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-video bg-black">
                  <iframe
                    src={(() => {
                      let url = selectedVideo.url;
                      if (url.includes('youtube.com/watch')) {
                        const videoId = url.split('v=')[1]?.split('&')[0];
                        return `https://www.youtube.com/embed/${videoId}`;
                      } else if (url.includes('youtu.be/')) {
                        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
                        return `https://www.youtube.com/embed/${videoId}`;
                      } else if (url.includes('vimeo.com/')) {
                        const videoId = url.split('vimeo.com/')[1];
                        return `https://player.vimeo.com/video/${videoId}`;
                      }
                      return url;
                    })()}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={selectedVideo.title}
                    frameBorder="0"
                  ></iframe>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{selectedVideo.title}</h3>
                    <button
                      onClick={() => setShowNotes(!showNotes)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                        showNotes
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                      }`}
                    >
                      <BookMarked className="w-4 h-4" />
                      <span>{showNotes ? 'Hide Notes' : 'Take Notes'}</span>
                    </button>
                  </div>

                  {/* Notes Section */}
                  {showNotes && (
                    <div className="border-t border-gray-200 pt-4 space-y-4">
                      {/* New Note Input */}
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-semibold text-gray-900">Write a Note</label>
                          <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded font-medium">
                            Elapsed: {getCurrentTimestamp()}
                          </span>
                        </div>
                        <textarea
                          value={currentNote}
                          onChange={(e) => setCurrentNote(e.target.value)}
                          placeholder="Type your notes here while watching the video..."
                          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                        />
                        <div className="flex justify-end space-x-2 mt-2">
                          <button
                            onClick={() => {
                              setCurrentNote('');
                              setShowNotes(false);
                            }}
                            className="flex items-center space-x-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                          <button
                            onClick={handleSaveNote}
                            disabled={!currentNote.trim()}
                            className="flex items-center space-x-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Note</span>
                          </button>
                        </div>
                      </div>

                      {/* Existing Notes for this Video */}
                      {videoNotes.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Notes for this video ({videoNotes.length})</h4>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {videoNotes.map((note) => (
                              <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-3">
                                <div className="flex items-start justify-between mb-2">
                                  <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                                    {note.timestamp}
                                  </span>
                                  <button
                                    onClick={() => handleDeleteNote(note.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-900 whitespace-pre-wrap">{note.content}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-2 mt-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Mark as Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <Play className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a topic to start learning</h3>
              <p className="text-gray-600">Choose any topic from the right sidebar to begin</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 order-1 lg:order-2 space-y-4">
          {courseModules.map((module) => (
            <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {expandedModules[module.id] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.topics.length} topics</p>
                  </div>
                </div>
              </button>

              {expandedModules[module.id] && (
                <div className="border-t border-gray-100">
                  {module.topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleVideoClick(topic)}
                      className={`w-full p-3 flex items-center justify-between hover:bg-blue-50 transition-colors ${
                        selectedVideo?.id === topic.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {topic.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Play className="w-4 h-4 text-blue-600" />
                        )}
                        <span className="text-sm text-gray-900">{topic.title}</span>
                      </div>
                      <span className="text-xs text-gray-500">{topic.duration}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
