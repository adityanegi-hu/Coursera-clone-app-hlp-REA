import React, { useState } from 'react';
import { Star, Clock, Users, Award, BookOpen } from 'lucide-react';

export default function CourseCatalog({
  courses,
  searchTerm,
  onSelectCourse,
  userState
}) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    'All',
    'Data Science & AI',
    'Computer Science',
    'Beginner',
    'Free to Audit',
    'Professional Certificates'
  ];

  const filteredCourses = courses.filter((course) => {
    // Search query filter
    const matchesSearch =
      !searchTerm ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.skillsGained.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    // Filter chip
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Data Science & AI') return course.category === 'Data Science & AI';
    if (selectedFilter === 'Computer Science') return course.category === 'Computer Science';
    if (selectedFilter === 'Beginner') return course.level === 'Beginner';
    if (selectedFilter === 'Professional Certificates') return course.specialization.includes('Certificate');

    return true;
  });

  return (
    <div className="cds-main-container" id="catalog-section">
      <div className="cds-section-header">
        <div>
          <h2 className="cds-section-title">
            {searchTerm ? `Results for "${searchTerm}"` : 'Explore Top Rated Courses'}
          </h2>
          <p className="cds-section-subtitle">
            Earn degrees and certificates from Stanford, Google, IBM, DeepLearning.AI, and more.
          </p>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="cds-filter-chips">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`cds-filter-chip ${selectedFilter === filter ? 'active' : ''}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="cds-course-grid">
        {filteredCourses.map((course) => {
          const isEnrolled = userState.enrolledCourseIds.includes(course.id);

          return (
            <div
              key={course.id}
              className="cds-course-card"
              onClick={() => onSelectCourse(course)}
            >
              <div className="cds-card-image-wrapper">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="cds-card-image"
                  loading="lazy"
                />
                <div className="cds-partner-badge-overlay">
                  <span>{course.partnerLogo}</span>
                  <span>{course.partner.split('&')[0]}</span>
                </div>
              </div>

              <div className="cds-card-body">
                <div className="cds-card-partner">{course.partner}</div>
                <h3 className="cds-card-title">{course.title}</h3>
                <div className="cds-card-skills">
                  <strong>Skills:</strong> {course.skillsGained.slice(0, 3).join(', ')}...
                </div>

                <div className="cds-card-meta">
                  <div className="cds-rating">
                    <Star size={14} className="cds-star-icon" />
                    <span>{course.rating}</span>
                    <span style={{ color: 'var(--cds-text-muted)', fontWeight: 400 }}>
                      ({course.reviewsCount})
                    </span>
                  </div>

                  <div className="cds-card-level">{course.level}</div>
                </div>

                {isEnrolled && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--cds-green)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <BookOpen size={14} />
                    <span>Enrolled • In Progress</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--cds-text-secondary)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
          <h3>No matching courses found for "{searchTerm}"</h3>
          <p style={{ marginTop: '0.5rem' }}>Try searching for "Machine Learning", "Python", or "Google".</p>
        </div>
      )}
    </div>
  );
}
