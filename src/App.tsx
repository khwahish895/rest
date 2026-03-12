/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { ComingSoon } from './components/ComingSoon';
import { DashboardLayout } from './components/dashboards/DashboardLayout';
import { MenuPage, OrderPage } from './components/MenuOrder';
import { AboutPage, GalleryPage, EventsPage, FAQPage, ContactPage, ReservationsPage } from './components/PublicPages';
import { CustomerDashboard } from './components/dashboards/CustomerDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { StaffDashboard } from './components/dashboards/StaffDashboard';
import { DeliveryDashboard } from './components/dashboards/DeliveryDashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainContent = ({ showSplash, setShowSplash, user, setUser, activeTab, setActiveTab, handleLogin, handleLogout }: any) => {
  const navigate = useNavigate();

  const renderDashboard = (role: 'customer' | 'admin' | 'staff' | 'delivery') => {
    if (!user) return <Navigate to="/login" />;
    if (user.role !== role) return <Navigate to="/" />;

    let content;
    switch (role) {
      case 'customer': content = <CustomerDashboard activeTab={activeTab} />; break;
      case 'admin': content = <AdminDashboard activeTab={activeTab} onRoleChange={(newRole) => {
        setUser({ ...user, role: newRole });
        setActiveTab('overview');
        navigate(`/${newRole}/dashboard`);
      }} />; break;
      case 'staff': content = <StaffDashboard activeTab={activeTab} />; break;
      case 'delivery': content = <DeliveryDashboard activeTab={activeTab} />; break;
    }

    return (
      <DashboardLayout 
        role={role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        onRoleChange={(newRole) => {
          setUser({ ...user, role: newRole });
          setActiveTab('overview');
          navigate(`/${newRole}/dashboard`);
        }}
      >
        {content}
      </DashboardLayout>
    );
  };

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <div className="min-h-screen bg-brand-cream relative">
          <ThreeBackground />
          <Routes>
            <Route path="/customer/*" element={null} />
            <Route path="/admin/*" element={null} />
            <Route path="/staff/*" element={null} />
            <Route path="/delivery/*" element={null} />
            <Route path="*" element={<Navbar user={user} onLogout={handleLogout} />} />
          </Routes>
          
          <Routes>
            {/* Website Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/specials" element={<ComingSoon title="Today's Specials" />} />
            <Route path="/reviews" element={<ComingSoon title="Customer Reviews" />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/reservation" element={<ReservationsPage />} />

            {/* Auth */}
            <Route path="/login" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <AuthPage onLogin={handleLogin} />} />

            {/* Dashboards */}
            <Route path="/customer/*" element={renderDashboard('customer')} />
            <Route path="/admin/*" element={renderDashboard('admin')} />
            <Route path="/staff/*" element={renderDashboard('staff')} />
            <Route path="/delivery/*" element={renderDashboard('delivery')} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogin = (userData: any) => {
    setUser(userData);
    setActiveTab('overview'); // Reset tab on login
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <MainContent 
        showSplash={showSplash} 
        setShowSplash={setShowSplash}
        user={user}
        setUser={setUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </Router>
  );
}
