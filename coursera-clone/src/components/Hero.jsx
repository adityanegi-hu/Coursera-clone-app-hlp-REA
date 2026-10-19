import React from 'react';
import { Sparkles, Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COURSERA_PARTNERS } from '../data/coursesData';

export default function Hero({ userState, onStartLearning }) {
  const goalPercentage = Math.min(
    100,
    Math.round((userState.completedGoalHours / userState.weeklyGoalHours) * 100)
  );

  return (
    <>
      <section className="cds-hero">
        <div className="cds-hero-content">
          <div>
            <div className="cds-hero-badge">
              <Sparkles size={14} />
              <span>Coursera Plus Available</span>
            </div>
            <h1 className="cds-hero-title">
              Learn without limits.
            </h1>
            <p className="cds-hero-subtitle">
              Start, switch, or advance your career with more than 7,000 courses, Professional Certificates, and degrees from world-class universities and companies.
            </p>
            <div className="cds-hero-actions">
              <button
                className="cds-btn-cta"
                onClick={onStartLearning}
              >
                Resume Machine Learning
              </button>
              <button
                className="cds-btn-outline"
                onClick={() => {
                  const catalogEl = document.getElementById('catalog-section');
                  if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse All 7,000+ Courses
              </button>
            </div>
          </div>

          {/* Goal & Momentum Card */}
          <div className="cds-hero-card">
            <div className="cds-goal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={20} color="#00e676" />
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Weekly Study Goal</span>
              </div>
              <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                {userState.completedGoalHours} / {userState.weeklyGoalHours} hrs
              </span>
            </div>

            <div className="cds-progress-bar-bg">
              <div
                className="cds-progress-bar-fill"
                style={{ width: `${goalPercentage}%` }}
              />
            </div>

            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
              <CheckCircle2 size={16} color="#00e676" />
              <span>You’re 60% towards your weekly goal! Keep it up.</span>
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.8 }}>Current Course</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Supervised Machine Learning</div>
              </div>
              <button
                style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, fontSize: '0.9rem' }}
                onClick={onStartLearning}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* University Partner Logos */}
      <div className="cds-partner-bar">
        <div className="cds-partner-title">
          We collaborate with 300+ leading universities and companies
        </div>
        <div className="cds-partner-logos">
          {COURSERA_PARTNERS.map((partner) => (
            <div key={partner.id} className="cds-partner-chip">
              <span style={{ fontSize: '1.4rem' }}>{partner.logo}</span>
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
