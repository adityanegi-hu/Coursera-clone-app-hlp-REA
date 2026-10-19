import React, { useState } from 'react';
import { Search, ChevronDown, Flame, BookOpen, Award, User, Bell } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  currentView,
  setCurrentView,
  userState,
  onOpenCert
}) {
  const [showExploreMenu, setShowExploreMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const categories = [
    'Data Science & AI',
    'Computer Science',
    'Business & Management',
    'Information Technology',
    'Physical Science & Engineering',
    'Health & Public Care'
  ];

  return (
    <header className="cds-navbar">
      <div className="cds-navbar-top">
        {/* Left: Brand & Explore */}
        <div className="cds-logo-group">
          <a
            href="#home"
            className="cds-logo"
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('catalog');
            }}
          >
            <div className="cds-logo-icon">c</div>
            <span>coursera</span>
          </a>

          <div style={{ position: 'relative' }}>
            <button
              className="cds-explore-btn"
              onClick={() => setShowExploreMenu(!showExploreMenu)}
            >
              <span>Explore</span>
              <ChevronDown size={16} />
            </button>

            {showExploreMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  left: 0,
                  width: '260px',
                  background: '#ffffff',
                  boxShadow: 'var(--cds-shadow-lg)',
                  borderRadius: 'var(--cds-radius-md)',
                  border: '1px solid var(--cds-border-light)',
                  padding: '0.75rem 0',
                  zIndex: 200
                }}
              >
                <div style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--cds-text-muted)', textTransform: 'uppercase' }}>
                  Subject Areas
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.6rem 1rem',
                      fontSize: '0.9rem',
                      color: 'var(--cds-text-main)',
                      fontWeight: 600,
                      display: 'block'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--cds-bg-gray)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    onClick={() => {
                      setSearchTerm(cat === 'Data Science & AI' ? 'Data Science' : cat);
                      setShowExploreMenu(false);
                      setCurrentView('catalog');
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Search */}
        <div className="cds-search-container">
          <div className="cds-search-box">
            <Search size={18} color="var(--cds-text-muted)" />
            <input
              type="text"
              className="cds-search-input"
              placeholder="What do you want to learn? (e.g. Machine Learning, Python, Google)"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (currentView !== 'catalog') setCurrentView('catalog');
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ fontSize: '0.85rem', color: 'var(--cds-text-muted)', padding: '0 0.25rem' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Navigation items */}
        <div className="cds-nav-actions">
          <a
            href="#my-learning"
            className={`cds-nav-link ${currentView === 'my-learning' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('my-learning');
            }}
          >
            My Learning
          </a>

          {/* Daily streak */}
          <div className="cds-streak-pill" title="Daily study streak">
            <Flame size={16} fill="#ff922b" color="#f76707" />
            <span>{userState.streakDays} Day Streak</span>
          </div>

          {/* User profile dropdown */}
          <div style={{ position: 'relative' }}>
            <div
              className="cds-user-profile-badge"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {userState.name.charAt(0)}
            </div>

            {showProfileMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '240px',
                  background: '#ffffff',
                  boxShadow: 'var(--cds-shadow-lg)',
                  borderRadius: 'var(--cds-radius-md)',
                  border: '1px solid var(--cds-border-light)',
                  padding: '0.5rem 0',
                  zIndex: 200
                }}
              >
                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--cds-border-light)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{userState.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--cds-text-muted)' }}>{userState.email}</div>
                </div>

                <button
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.7rem 1rem', fontSize: '0.9rem', color: 'var(--cds-text-main)' }}
                  onClick={() => {
                    setCurrentView('my-learning');
                    setShowProfileMenu(false);
                  }}
                >
                  <BookOpen size={16} color="var(--cds-primary)" />
                  <span>My Courses &amp; Progress</span>
                </button>

                <button
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.7rem 1rem', fontSize: '0.9rem', color: 'var(--cds-text-main)' }}
                  onClick={() => {
                    onOpenCert('machine-learning-specialization');
                    setShowProfileMenu(false);
                  }}
                >
                  <Award size={16} color="#e59819" />
                  <span>View Verified Certificate</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
