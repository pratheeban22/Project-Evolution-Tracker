import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Folder, 
  UploadCloud, 
  Lightbulb, 
  User, 
  LogOut,
  Bell,
  ChevronRight
} from 'lucide-react';
import './DashboardLayout.css';

export const DashboardLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/auth');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/app' },
    { icon: Folder, label: 'My Projects', path: '/app/projects' },
    { icon: UploadCloud, label: 'Upload', path: '/app/upload' },
    { icon: Lightbulb, label: 'Suggestions', path: '/app/suggestions' },
    { icon: User, label: 'Profile', path: '/app/profile' },
  ];

  // Simple breadcrumbs
  const pathParts = location.pathname.split('/').filter(p => p && p !== 'app');
  const breadcrumb = pathParts.length > 0 
    ? pathParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' / ')
    : 'Dashboard';

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside 
        className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="sidebar-header">
          <div className="logo-icon"></div>
          {isExpanded && <span className="logo-text text-gradient">EvoTrack</span>}
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item, index) => (
            <NavLink 
              key={index} 
              to={item.path} 
              end={item.path === '/app'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={22} className="nav-icon" />
              {isExpanded && <span className="nav-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={22} className="nav-icon text-danger" />
            {isExpanded && <span className="nav-label text-danger">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="breadcrumbs">
            <span className="text-muted">App</span>
            <ChevronRight size={14} className="text-muted" />
            <span className="text-primary font-medium">{breadcrumb}</span>
          </div>
          
          <div className="top-bar-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="avatar">JD</div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
