import React, { useEffect, useState } from 'react';
import { Download, ArrowLeft, Lightbulb, AlertTriangle, Rocket, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import './ResultsPage.css';

export const ResultsPage = () => {
  const { id } = useParams();
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#4f8ef7', '#8b5cf6', '#10b981']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4f8ef7', '#8b5cf6', '#10b981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const similarProjects = [
    { id: 1, title: 'IoT Smart Agriculture and Crop Prediction', similarity: 85, domain: 'IoT', warnings: ['Uses outdated sensor models', 'Limited data set for ML'] },
    { id: 2, title: 'Automated Farm Management System', similarity: 62, domain: 'Web Dev', warnings: ['No real-time analytics', 'Poor UI design'] },
    { id: 3, title: 'Crop Yield Predictor using Deep Learning', similarity: 41, domain: 'Machine Learning', warnings: ['High computational cost', 'Not mobile friendly'] },
    { id: 4, title: 'Smart Irrigation Node Controller', similarity: 28, domain: 'Embedded Systems', warnings: ['Hardcoded thresholds', 'Single crop focus'] },
  ];

  const suggestions = {
    improvements: [
      { id: 'imp1', title: 'Enhance Data Preprocessing', desc: 'Your methodology skips crucial data normalization steps for the sensor inputs. Adding a standard scalar or min-max scalar will improve model accuracy by 15-20%.' },
      { id: 'imp2', title: 'Implement Edge Computing', desc: 'Instead of sending all raw sensor data to the cloud, process basic thresholds locally on the microcontroller to reduce latency and bandwidth.' },
      { id: 'imp3', title: 'Add User Authentication', desc: 'The current proposal lacks a secure way for different farmers to access only their farm\'s data. Implement JWT-based auth.' },
    ],
    limitations: [
      { id: 'lim1', title: 'Battery Life Constraint', desc: 'The proposed Wi-Fi module (ESP8266) consumes too much power for battery-operated field nodes. Consider switching to LoRaWAN or NB-IoT.' },
      { id: 'lim2', title: 'Dataset Bias', desc: 'The training dataset mentioned only covers tropical climates, making the ML model ineffective for temperate region crops.' },
    ],
    innovations: [
      { id: 'inn1', title: 'Drone Integration', desc: 'Add a module where the system can dispatch a lightweight drone to inspect areas where soil moisture sensors report anomalies.' },
      { id: 'inn2', title: 'Market Price API Integration', desc: 'Link the yield prediction directly to a live agricultural commodities API to estimate expected revenue for the farmer in real-time.' },
    ]
  };

  return (
    <div className="results-page pb-24">
      {/* Page Header */}
      <div className="results-header">
        <div className="header-tags">
          <Badge variant="primary">IoT / Machine Learning</Badge>
          <Badge variant="success">Final Phase</Badge>
        </div>
        <h1 className="project-title-large">Smart Agriculture System with Yield Prediction</h1>
        <p className="text-muted mt-2">Analysis completed on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Similarity Section */}
      <section className="results-section">
        <div className="section-title">
          <h2>Similarity Analysis</h2>
          <span className="badge badge-warning">Overall Score: 42%</span>
        </div>
        
        <div className="horizontal-scroll-container">
          {similarProjects.map((project, idx) => (
            <Card key={project.id} className="similarity-card">
              <div className="sim-card-header">
                <span className="rank-badge">#{idx + 1}</span>
                <Badge variant="default" className="text-xs">{project.domain}</Badge>
              </div>
              
              <h4 className="sim-title">{project.title}</h4>
              
              <div className="gauge-container">
                <div className="gauge-value text-gradient">{project.similarity}%</div>
                <div className="gauge-label">Similarity</div>
              </div>
              
              <div className="sim-warnings">
                {project.warnings.map((w, i) => (
                  <div key={i} className="warning-chip">
                    <AlertTriangle size={12} />
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Suggestions Section */}
      <section className="results-section mt-8">
        <h2>AI-Powered Action Plan</h2>
        
        <div className="suggestions-grid">
          {/* Column 1: Improvements */}
          <div className="suggestion-column">
            <h3 className="column-title flex items-center gap-2">
              <Lightbulb className="text-success" />
              Improvements
            </h3>
            
            <div className="cards-stack">
              {suggestions.improvements.map((item) => (
                <div 
                  key={item.id} 
                  className={`suggestion-card border-l-success ${expandedCards[item.id] ? 'expanded' : ''}`}
                  onClick={() => toggleCard(item.id)}
                >
                  <div className="s-card-header">
                    <h4>{item.title}</h4>
                    {expandedCards[item.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <div className="s-card-body">
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Limitations */}
          <div className="suggestion-column">
            <h3 className="column-title flex items-center gap-2">
              <AlertTriangle className="text-warning" />
              Limitations to Fix
            </h3>
            
            <div className="cards-stack">
              {suggestions.limitations.map((item) => (
                <div 
                  key={item.id} 
                  className={`suggestion-card border-l-warning ${expandedCards[item.id] ? 'expanded' : ''}`}
                  onClick={() => toggleCard(item.id)}
                >
                  <div className="s-card-header">
                    <h4>{item.title}</h4>
                    {expandedCards[item.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <div className="s-card-body">
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Innovations */}
          <div className="suggestion-column">
            <h3 className="column-title flex items-center gap-2">
              <Rocket className="text-secondary" />
              Innovative Ideas
            </h3>
            
            <div className="cards-stack">
              {suggestions.innovations.map((item) => (
                <div 
                  key={item.id} 
                  className={`suggestion-card border-l-secondary ${expandedCards[item.id] ? 'expanded' : ''}`}
                  onClick={() => toggleCard(item.id)}
                >
                  <div className="s-card-header">
                    <h4>{item.title}</h4>
                    {expandedCards[item.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <div className="s-card-body">
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div className="sticky-bottom-bar">
        <Link to="/app">
          <Button variant="ghost" icon={ArrowLeft}>Back to Dashboard</Button>
        </Link>
        <Button variant="primary" icon={Download} className="glow-btn">
          Download PDF Report
        </Button>
      </div>
    </div>
  );
};
