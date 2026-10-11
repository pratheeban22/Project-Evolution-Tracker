import React, { useState } from 'react';
import { Camera, Edit2, Save, Trash2, Shield, Bell, Key } from 'lucide-react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import './ProfilePage.css';

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@university.edu',
    department: 'Computer Science',
    year: 'Senior (4th Year)'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // show toast
  };

  return (
    <div className="profile-page pb-24">
      {/* Profile Header */}
      <div className="profile-header-banner">
        <div className="profile-avatar-container">
          <div className="profile-avatar">
            <span className="avatar-initials">JD</span>
            <button className="avatar-edit-overlay tooltip-trigger">
              <Camera size={20} />
              <span className="tooltip">Change Photo</span>
            </button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        {/* Left Column: Personal Info */}
        <div className="profile-left">
          <Card className="profile-card">
            <div className="card-header-flex">
              <h3>Personal Information</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                icon={isEditing ? Save : Edit2}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>

            <div className="profile-form">
              <div className="form-grid">
                <Input 
                  label="Full Name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <Input 
                  label="Email Address" 
                  name="email" 
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <Input 
                  label="Department" 
                  name="department" 
                  value={formData.department}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <Input 
                  label="Year of Study" 
                  name="year" 
                  value={formData.year}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </Card>

          <Card className="profile-card mt-6">
            <h3>Security Settings</h3>
            
            <div className="security-section">
              <div className="security-item" onClick={() => setShowPassword(!showPassword)}>
                <div className="flex items-center gap-3">
                  <div className="icon-bg-subtle"><Key size={20} className="text-muted" /></div>
                  <div>
                    <h4>Change Password</h4>
                    <p className="text-xs text-muted">Update your password to keep your account secure.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>

              {showPassword && (
                <div className="password-change-form">
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                  <Input label="Confirm New Password" type="password" />
                  <Button variant="primary" size="sm" className="mt-2">Save Password</Button>
                </div>
              )}

              <div className="security-item">
                <div className="flex items-center gap-3">
                  <div className="icon-bg-subtle"><Shield size={20} className="text-muted" /></div>
                  <div>
                    <h4>Two-Factor Authentication</h4>
                    <p className="text-xs text-muted">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </div>
          </Card>

          <div className="danger-zone mt-8">
            <h4 className="text-danger mb-4">Danger Zone</h4>
            <Card className="border-danger-subtle bg-danger-subtle">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-danger">Delete Account</h4>
                  <p className="text-xs text-muted mt-1">Once you delete your account, there is no going back. Please be certain.</p>
                </div>
                <Button variant="danger" icon={Trash2}>Delete Account</Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column: Stats */}
        <div className="profile-right">
          <Card className="stats-panel">
            <h3>Your Evolution Stats</h3>
            
            <div className="stat-rings mt-6">
              <div className="stat-ring-item">
                <div className="ring-container blue">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle-fill" strokeDasharray="80, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <text x="18" y="20.35" className="percentage">4</text>
                  </svg>
                </div>
                <div className="stat-desc">
                  <h4>Total Projects</h4>
                  <p className="text-xs text-muted">Uploaded to EvoTrack</p>
                </div>
              </div>

              <div className="stat-ring-item">
                <div className="ring-container purple">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle-fill" strokeDasharray="65, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <text x="18" y="20.35" className="percentage">12</text>
                  </svg>
                </div>
                <div className="stat-desc">
                  <h4>Phases Completed</h4>
                  <p className="text-xs text-muted">Across all projects</p>
                </div>
              </div>

              <div className="stat-ring-item">
                <div className="ring-container green">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle-fill" strokeDasharray="40, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <text x="18" y="20.35" className="percentage">24</text>
                  </svg>
                </div>
                <div className="stat-desc">
                  <h4>Suggestions Received</h4>
                  <p className="text-xs text-muted">From AI analysis</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Floating Save Indicator */}
      {isEditing && (
        <div className="fixed-save-indicator animate-fade-in-up">
          <div className="unsaved-dot"></div>
          <span>Unsaved changes</span>
          <Button variant="primary" size="sm" onClick={handleSave} className="ml-4">Save Changes</Button>
        </div>
      )}
    </div>
  );
};
