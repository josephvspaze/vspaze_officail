import React, { useState, useEffect } from 'react';
import { BookMarked, Plus, Trash2, Edit2, Save, X, Video, Clock, Search } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem('student_notes') || '[]');
    setNotes(savedNotes);
  }, []);

  const saveNotesToStorage = (updatedNotes) => {
    localStorage.setItem('student_notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter(note => note.id !== noteId);
      saveNotesToStorage(updatedNotes);
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
      }
    }
  };

  const handleUpdateNote = (noteId, updatedContent) => {
    const updatedNotes = notes.map(note =>
      note.id === noteId ? { ...note, content: updatedContent, updatedAt: new Date().toISOString() } : note
    );
    saveNotesToStorage(updatedNotes);
    setSelectedNote({ ...selectedNote, content: updatedContent });
    setIsEditing(false);
  };

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.videoTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">My Notes</h2>
          <p className="text-gray-600 text-sm mt-1">{notes.length} notes saved</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <BookMarked className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
          <BookMarked className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Notes Yet</h3>
          <p className="text-gray-600 mb-4">Start taking notes while watching course videos</p>
          <p className="text-sm text-gray-500">Your notes will appear here automatically</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes List */}
          <div className="lg:col-span-1 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => {
                  setSelectedNote(note);
                  setIsEditing(false);
                }}
                className={`bg-white rounded-xl shadow-sm p-4 border cursor-pointer transition-all hover:shadow-md ${
                  selectedNote?.id === note.id ? 'border-purple-500 ring-2 ring-purple-100' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <Video className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{note.videoTitle || 'Untitled Video'}</h3>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">{note.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(note.createdAt)}</span>
                  </div>
                  {note.timestamp && <span>{note.timestamp}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Note Detail View */}
          <div className="lg:col-span-2">
            {selectedNote ? (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Video className="w-5 h-5 text-purple-600" />
                      <h3 className="text-xl font-bold text-gray-900">{selectedNote.videoTitle || 'Untitled Video'}</h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{formatDate(selectedNote.createdAt)} at {formatTime(selectedNote.createdAt)}</span>
                      {selectedNote.timestamp && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {selectedNote.timestamp}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!isEditing ? (
                      <>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(selectedNote.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <EditNoteForm
                    note={selectedNote}
                    onSave={handleUpdateNote}
                    onCancel={() => setIsEditing(false)}
                  />
                ) : (
                  <div className="prose max-w-none">
                    <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-gray-900">
                      {selectedNote.content}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
                <BookMarked className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Note</h3>
                <p className="text-gray-600">Choose a note from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const EditNoteForm = ({ note, onSave, onCancel }) => {
  const [content, setContent] = useState(note.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSave(note.id, content);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
        placeholder="Write your note here..."
      />
      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
};

export default Notes;
