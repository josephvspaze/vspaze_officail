import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, ScrollRestoration } from 'react-router-dom';
import InstituteLayout from './institute/InstituteLayout';
import Home from './institute/pages/Home';
import About from './institute/pages/About';
import Courses from './institute/pages/Courses';
import Faculty from './institute/pages/Faculty';
import Contact from './institute/pages/Contact';
import SuccessStories from './institute/pages/SuccessStories';
import FacultyDetail from './institute/pages/FacultyDetail';
import TeacherRegistration from './institute/pages/TeacherRegistration';
import Certifications from './institute/pages/Certifications';
import Admissions from './institute/pages/Admissions';
import StudentRegistration from './institute/pages/StudentRegistration';
import CourseDetail from './institute/pages/CourseDetail';
import StudentLogin from './pages/StudentLogin';
import StudentApp from './student/StudentApp';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function AppRouter() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<InstituteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="courses" element={<Courses />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="success-stories" element={<SuccessStories />} />
          <Route path="faculty/:id" element={<FacultyDetail />} />
          <Route path="teacher-registration" element={<TeacherRegistration />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="contact" element={<Contact />} />
          <Route path="student-registration" element={<StudentRegistration />} />
          <Route path="course/:id" element={<CourseDetail />} />
        </Route>
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student" element={<StudentApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
