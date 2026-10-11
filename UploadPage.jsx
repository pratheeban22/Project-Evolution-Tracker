import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, CheckCircle, Info } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import './UploadPage.css';

export const UploadPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    description: '',
    phase: 'Proposal'
  });
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.title && formData.domain && formData.description && file;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/app/results/new');
        }, 500);
      }
    }, 100);
  };

  const phases = ['Proposal', 'Review', 'Final'];

  return (
    <div className="upload-page">
      <div className="page-header">
        <h2>Upload Project</h2>
        <p className="text-muted">Submit your project details for AI analysis and similarity checking.</p>
      </div>

      <div className="upload-container">
        {/* Left Form */}
        <div className="upload-form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-6">
              <label className="input-label mb-2 block">Project Phase</label>
              <div className="phase-selector">
                {phases.map(phase => (
                  <button
                    key={phase}
                    type="button"
                    className={`phase-pill ${formData.phase === phase ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, phase })}
                  >
                    {phase}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Project Title"
              name="title"
              placeholder="e.g. Smart Agriculture System"
              value={formData.title}
              onChange={handleChange}
              maxLength={100}
            />
            <div className="char-counter text-xs text-muted text-right mb-4">
              {formData.title.length}/100
            </div>

            <div className="form-group mb-4">
              <label className="input-label mb-2 block">Domain</label>
              <div className="custom-select-wrapper">
                <select 
                  name="domain" 
                  value={formData.domain} 
                  onChange={handleChange}
                  className="custom-select"
                >
                  <option value="" disabled>Select Domain</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="IoT">IoT</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group mb-2">
              <div className="flex-between">
                <label className="input-label">Abstract / Description</label>
                <div className="tooltip-trigger">
                  <Info size={14} className="text-muted" />
                  <span className="tooltip">Provide a detailed summary. The AI uses this for similarity matching.</span>
                </div>
              </div>
              <textarea
                name="description"
                className="custom-textarea mt-2"
                rows={5}
                placeholder="Describe your project's main objectives, methodology, and expected outcomes..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <div className="word-counter text-xs text-muted text-right mt-1">
                {formData.description.split(/\s+/).filter(w => w.length > 0).length} words
              </div>
            </div>

            <div className="form-group mb-6">
              <label className="input-label mb-2 block">Upload Document (PDF, DOCX)</label>
              <div 
                className={`file-drop-zone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden-file-input" 
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf,.docx,.doc"
                />
                <label htmlFor="file-upload" className="drop-zone-content">
                  {file ? (
                    <>
                      <FileText size={32} className="text-primary mb-2" />
                      <span className="font-medium">{file.name}</span>
                      <span className="text-xs text-muted mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={32} className="text-muted mb-2" />
                      <span className="font-medium">Drag & drop your file here</span>
                      <span className="text-xs text-muted mt-1">or click to browse files</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth 
              disabled={!isFormValid || isUploading}
              className={isFormValid && !isUploading ? 'btn-pulse' : ''}
            >
              {isUploading ? 'Analyzing...' : 'Submit for AI Analysis'}
            </Button>
          </form>
        </div>

        {/* Right Live Preview */}
        <div className="upload-preview-section">
          <Card className="preview-card">
            <div className="preview-header">
              <span className="text-xs font-medium text-muted uppercase tracking-wider">Live Preview</span>
            </div>
            
            <div className="preview-content">
              <div className="preview-phase">
                <span className={`preview-badge bg-${formData.phase === 'Proposal' ? 'blue' : formData.phase === 'Review' ? 'amber' : 'green'}`}>
                  {formData.phase}
                </span>
              </div>
              
              <h3 className={`preview-title ${!formData.title ? 'empty' : ''}`}>
                {formData.title || 'Your Project Title Will Appear Here'}
              </h3>
              
              <div className={`preview-domain ${!formData.domain ? 'empty' : ''}`}>
                {formData.domain ? `Domain: ${formData.domain}` : 'Domain not selected'}
              </div>
              
              <div className="preview-desc-wrapper">
                <p className={`preview-desc ${!formData.description ? 'empty' : ''}`}>
                  {formData.description || 'Project description will be previewed here. Start typing to see how it looks.'}
                </p>
              </div>
              
              {file && (
                <div className="preview-file">
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-sm">Document attached</span>
                </div>
              )}
            </div>

            {isUploading && (
              <div className="upload-overlay">
                <div className="progress-ring-container">
                  <svg className="progress-ring" width="120" height="120">
                    <circle className="progress-ring-bg" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" r="52" cx="60" cy="60"/>
                    <circle 
                      className="progress-ring-fill" 
                      stroke="url(#gradient)" 
                      strokeWidth="8" 
                      fill="transparent" 
                      r="52" 
                      cx="60" 
                      cy="60"
                      style={{ strokeDasharray: `${326.72 * (uploadProgress / 100)} 326.72` }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4f8ef7" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="progress-text">{uploadProgress}%</div>
                </div>
                <p className="mt-4 font-medium text-primary animate-pulse">Running NLP Analysis...</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
