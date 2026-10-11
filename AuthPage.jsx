import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import './AuthPage.css';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (state) => {
    setIsLogin(state);
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (!isLogin) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/app');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="auth-page">
      {/* Left Side - Visual */}
      <div className="auth-visual">
        <div className="auth-visual-content">
          <div className="logo-container">
            <div className="logo-icon-large"></div>
            <span className="font-bold text-xl">EvoTrack</span>
          </div>
          <h1 className="auth-heading">
            Elevate Your <br />
            <span className="text-gradient">Academic Journey</span>
          </h1>
          <p className="auth-subheading">
            Join thousands of students turning average projects into industry-ready portfolios.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          {success ? (
            <div className="success-state">
              <CheckCircle2 size={64} className="text-success success-icon" />
              <h2>Welcome aboard!</h2>
              <p className="text-muted">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <>
              <div className="auth-tabs">
                <button 
                  className={`auth-tab ${isLogin ? 'active' : ''}`}
                  onClick={() => handleToggle(true)}
                >
                  Login
                </button>
                <button 
                  className={`auth-tab ${!isLogin ? 'active' : ''}`}
                  onClick={() => handleToggle(false)}
                >
                  Sign Up
                </button>
                <div className={`tab-indicator ${isLogin ? 'left' : 'right'}`}></div>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                {!isLogin && (
                  <Input 
                    label="Full Name" 
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                )}
                
                <Input 
                  label="Email Address" 
                  name="email"
                  type="email"
                  placeholder="john@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                
                <Input 
                  label="Password" 
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                />

                {!isLogin && (
                  <>
                    <div className="password-strength">
                      <div className="strength-bar fill"></div>
                      <div className="strength-bar fill"></div>
                      <div className="strength-bar"></div>
                      <div className="strength-bar"></div>
                    </div>
                    
                    <Input 
                      label="Confirm Password" 
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                    />
                    
                    <div className="terms-checkbox">
                      <input type="checkbox" id="terms" required className="custom-checkbox" />
                      <label htmlFor="terms" className="text-muted">
                        I agree to the <a href="#" className="text-primary">Terms</a> and <a href="#" className="text-primary">Privacy Policy</a>
                      </label>
                    </div>
                  </>
                )}

                {isLogin && (
                  <div className="login-options">
                    <div className="remember-me">
                      <input type="checkbox" id="remember" className="custom-checkbox" />
                      <label htmlFor="remember" className="text-muted">Remember me</label>
                    </div>
                    <a href="#" className="forgot-password text-primary">Forgot Password?</a>
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth 
                  size="lg"
                  isLoading={isLoading}
                  icon={!isLoading ? ArrowRight : null}
                  className="mt-4"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
                
                <div className="divider">
                  <span>or continue with</span>
                </div>
                
                <Button variant="outline" fullWidth size="md" className="google-btn">
                  <svg className="google-icon" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
