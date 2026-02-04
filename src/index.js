import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './AppRouter';

// Disable copy, cut, and save shortcuts (but allow inspect)
document.addEventListener('keydown', (e) => {
  // Disable Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+U (copy, cut, save, view source)
  if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 's' || e.key === 'u')) {
    // Allow in input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    e.preventDefault();
  }
  
  // Allow F12 and Ctrl+Shift+I for inspect
  if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I')) {
    return;
  }
});

// Disable copy event
document.addEventListener('copy', (e) => {
  // Allow in input fields
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    return;
  }
  e.preventDefault();
});

// Disable cut event
document.addEventListener('cut', (e) => {
  // Allow in input fields
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    return;
  }
  e.preventDefault();
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRouter />);
