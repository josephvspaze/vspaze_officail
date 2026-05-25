import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import InstituteNavbar from './components/InstituteNavbar';
import InstituteFooter from './components/InstituteFooter';
import CountdownBanner from './components/CountdownBanner';
import ScholarshipPopup from './components/ScholarshipPopup';

const InstituteLayout = () => {
  const { pathname } = useLocation();
  const [bannerVisible, setBannerVisible] = React.useState(() => {
    return sessionStorage.getItem('bannerHidden') !== 'true';
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const checkBanner = () => {
      const hidden = sessionStorage.getItem('bannerHidden') === 'true';
      setBannerVisible(!hidden);
    };

    checkBanner();
    const handleStorageChange = () => checkBanner();
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(checkBanner, 100);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ paddingTop: bannerVisible ? (window.innerWidth >= 1024 ? '64px' : '72px') : '0px' }}>
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
