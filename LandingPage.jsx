import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Upload, Brain, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import './LandingPage.css';

export const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="floating-nav">
        <div className="nav-logo">
          <div className="logo-icon-small"></div>
          <span className="font-bold">EvoTrack</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#testimonials">Testimonials</a>
        </div>
        <div className="nav-actions">
          <Link to="/auth">
            <Button variant="primary" className="glow-btn">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-mesh"></div>
        <div className="hero-particles"></div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title animate-fade-in-up">
              <span className="text-white">Evolve Your</span><br/>
              <span className="text-gradient">Academic Projects</span>
            </h1>
            <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              The AI-powered platform for college students to analyze, improve, and elevate their academic projects to industry standards.
            </p>
            <div className="hero-cta animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/auth">
                <Button variant="primary" size="lg" icon={ArrowRight}>Start Evolving</Button>
              </Link>
              <Button variant="ghost" size="lg">View Demo</Button>
            </div>
            
            <div className="hero-stats animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="stat-item">
                <span className="stat-value">500+</span>
                <span className="stat-label">Projects Analyzed</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">98%</span>
                <span className="stat-label">Student Satisfaction</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">3x</span>
                <span className="stat-label">Better Quality</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual animate-float">
            <div className="mockup-card glass-panel">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <div className="mockup-body">
                <div className="mockup-line w-3/4"></div>
                <div className="mockup-line w-1/2"></div>
                <div className="mockup-chart">
                  <div className="chart-bar h-60"></div>
                  <div className="chart-bar h-80"></div>
                  <div className="chart-bar h-40"></div>
                  <div className="chart-bar h-100"></div>
                </div>
                <div className="mockup-card-mini">
                  <Sparkles size={16} className="text-accent" />
                  <span>AI Suggestion Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Supercharge Your Work</h2>
            <p className="text-muted">Everything you need to build better academic projects.</p>
          </div>
          
          <div className="features-grid">
            <Card className="feature-card" hoverable>
              <div className="feature-icon-wrapper bg-blue">
                <Shield className="text-primary" size={24} />
              </div>
              <h3>Secure Authentication</h3>
              <p className="text-muted">Your project data is encrypted and securely stored. Only you have access to your intellectual property.</p>
            </Card>
            
            <Card className="feature-card" hoverable>
              <div className="feature-icon-wrapper bg-purple">
                <Upload className="text-secondary" size={24} />
              </div>
              <h3>Phase-Based Upload</h3>
              <p className="text-muted">Track your project evolution from initial proposal through review and final submission stages.</p>
            </Card>
            
            <Card className="feature-card" hoverable>
              <div className="feature-icon-wrapper bg-amber">
                <Brain className="text-warning" size={24} />
              </div>
              <h3>NLP Similarity</h3>
              <p className="text-muted">Advanced Natural Language Processing compares your idea against thousands of existing projects.</p>
            </Card>
            
            <Card className="feature-card" hoverable>
              <div className="feature-icon-wrapper bg-green">
                <Sparkles className="text-success" size={24} />
              </div>
              <h3>AI Suggestions</h3>
              <p className="text-muted">Get actionable insights to improve methodology, overcome limitations, and add innovative features.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p className="text-muted">Five simple steps to academic excellence.</p>
          </div>
          
          <div className="timeline">
            <div className="timeline-line"></div>
            {[
              { title: 'Create Account', desc: 'Sign up securely to get your personalized dashboard.' },
              { title: 'Upload Project', desc: 'Submit your project details, domain, and abstract.' },
              { title: 'AI Analysis', desc: 'Our engine processes your project using advanced NLP.' },
              { title: 'Review Matches', desc: 'See similar existing projects and identify your unique value.' },
              { title: 'Apply Suggestions', desc: 'Implement AI-driven improvements for a stellar final grade.' }
            ].map((step, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot">{idx + 1}</div>
                <div className="timeline-content">
                  <h4>{step.title}</h4>
                  <p className="text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Students Say</h2>
            <p className="text-muted">Join the community of successful academic achievers.</p>
          </div>
          
          <div className="testimonials-grid">
            <Card className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">"EvoTrack completely transformed my final year project. The AI suggestions helped me identify a major flaw in my methodology before my mid-term review. I ended up getting an A+!"</p>
              <div className="testimonial-author">
                <div className="author-avatar bg-blue">AS</div>
                <div className="author-info">
                  <h4>Alex Sterling</h4>
                  <span className="text-xs text-muted">Computer Science, Class of '26</span>
                </div>
              </div>
            </Card>
            
            <Card className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">"I was struggling to find a unique angle for my machine learning project. The similarity checker showed me what had already been done, and the innovation suggestions gave me the perfect unique feature to add."</p>
              <div className="testimonial-author">
                <div className="author-avatar bg-purple">MD</div>
                <div className="author-info">
                  <h4>Maria Delgado</h4>
                  <span className="text-xs text-muted">Data Science, Class of '27</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="logo-icon-small"></div>
            <span className="font-bold">EvoTrack</span>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Support</a>
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Project Evolution Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
