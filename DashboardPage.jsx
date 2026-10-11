import React from 'react';
import { Folder, Play, CheckCircle, Zap, Activity, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import './DashboardPage.css';

export const DashboardPage = () => {
  const stats = [
    { label: 'Total Projects', value: '4', icon: Folder, color: 'blue' },
    { label: 'Current Phase', value: 'Review', icon: Play, color: 'purple' },
    { label: 'Suggestions', value: '24', icon: Zap, color: 'green' },
    { label: 'Avg. Similarity', value: '18%', icon: Activity, color: 'amber' },
  ];

  const recentProjects = [
    { id: 1, title: 'Smart Attendance System using Facial Recognition', domain: 'Machine Learning', phase: 'Review', date: 'Oct 15, 2026', similarity: 12 },
    { id: 2, title: 'Decentralized Library Management', domain: 'Web Development', phase: 'Final', date: 'Sep 28, 2026', similarity: 4 },
    { id: 3, title: 'IoT Based Food Delivery Tracker', domain: 'IoT', phase: 'Proposal', date: 'Aug 10, 2026', similarity: 25 },
  ];

  const getPhaseBadge = (phase) => {
    switch (phase) {
      case 'Proposal': return <Badge variant="primary">Proposal</Badge>;
      case 'Review': return <Badge variant="warning">Review</Badge>;
      case 'Final': return <Badge variant="success">Final</Badge>;
      default: return <Badge>{phase}</Badge>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-content">
          <h2>Welcome back, John! 👋</h2>
          <p>You have 3 active projects. The Smart Attendance System is awaiting your review.</p>
        </div>
        <div className="banner-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <Card key={idx} className={`stat-card hoverable-card stat-${stat.color}`}>
            <div className={`stat-icon-wrapper bg-${stat.color}`}>
              <stat.icon size={24} className={`text-${stat.color}`} />
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="section-header-row">
        <h3>Recent Projects</h3>
        <Link to="/app/projects">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </div>

      <Card className="projects-table-card">
        <div className="table-responsive">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Phase</th>
                <th>Similarity</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="project-title-cell">
                      <span className="font-medium">{project.title}</span>
                      <span className="text-muted text-xs">{project.domain}</span>
                    </div>
                  </td>
                  <td>{getPhaseBadge(project.phase)}</td>
                  <td>
                    <div className="similarity-cell">
                      <div className="similarity-bar-bg">
                        <div 
                          className={`similarity-bar-fill ${project.similarity > 20 ? 'bg-amber' : 'bg-green'}`} 
                          style={{ width: `${project.similarity}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{project.similarity}%</span>
                    </div>
                  </td>
                  <td className="text-muted text-sm">{project.date}</td>
                  <td>
                    <Link to={`/app/results/${project.id}`}>
                      <Button variant="outline" size="sm">View Report</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Floating Action Button */}
      <Link to="/app/upload" className="fab tooltip-trigger">
        <Plus size={24} />
      </Link>
    </div>
  );
};
