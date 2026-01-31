import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import InstituteNavbar from './components/InstituteNavbar';
import InstituteFooter from './components/InstituteFooter';

const InstituteLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <InstituteNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <InstituteFooter />
    </div>
  );
};

export default InstituteLayout;
