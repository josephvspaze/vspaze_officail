import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import InstituteNavbar from './components/InstituteNavbar';
import InstituteFooter from './components/InstituteFooter';
import CountdownBanner from './components/CountdownBanner';
import ScholarshipPopup from './components/ScholarshipPopup';

const InstituteLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <CountdownBanner />
      <InstituteNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <InstituteFooter />
      <ScholarshipPopup />
    </div>
  );
};

export default InstituteLayout;
