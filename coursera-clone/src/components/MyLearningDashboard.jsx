import React from 'react';
import { BookOpen, Award, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function MyLearningDashboard({
  courses,
  userState,
  onGoToClassroom,
  onOpenCert
}) {
  const enrolledCourses = courses.filter((c) =>
    userState.enrolledCourseIds.includes(c.id)
  );

  return (
    <div className="cds-main-container">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--cds-navy)' }}>
          My Learning Dashboard
        </h1>
        <p style={{ color: 'var(--cds-text-secondary)', marginTop: '0.25rem' }}>
          Welcome back, {userState.name}! Pick up where you left off.
        </p>
      </div>

      {/* Progress Cards */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--cds-navy)', marginBottom: '1.25rem' }}>
          In Progress ({enrolledCourses.length})
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {enrolledCourses.map((course) => {
            const totalItems = course.modules.reduce((acc, m) => acc + m.items.length, 0);
            const completedCount = course.modules.reduce(
              (acc, m) =>
                acc +
                m.items.filter((item) => userState.completedItemIds.includes(item.id)).length,
              0
            );
            const percentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 65;

            return (
              <div
                key={course.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--cds-border-light)',
                  borderRadius: 'var(--cds-radius-md)',
                  boxShadow: 'var(--cds-shadow-sm)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '140px', position: 'relative' }}>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="cds-partner-badge-overlay">
                    <span>{course.partnerLogo}</span>
                    <span>{course.partner.split('&')[0]}</span>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--cds-text-secondary)', textTransform: 'uppercase' }}>
                    {course.specialization}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--cds-navy)', marginTop: '0.25rem', marginBottom: '1rem' }}>
                    {course.title}
                  </h3>

                  {/* Progress bar */}
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 600 }}>{percentage}% Completed</span>
                      <span style={{ color: 'var(--cds-text-muted)' }}>
                        {completedCount} of {totalItems || 6} items
                      </span>
                    </div>

                    <div style={{ height: '6px', background: 'var(--cds-bg-gray)', borderRadius: '3px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                      <div
                        style={{
                          height: '100%',
                          background: 'var(--cds-primary)',
                          width: `${percentage}%`,
                          borderRadius: '3px'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={() => onGoToClassroom(course)}
                        style={{
                          flex: 1,
                          background: 'var(--cds-primary)',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          padding: '0.65rem 1rem',
                          borderRadius: 'var(--cds-radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <span>Resume Learning</span>
                        <ArrowRight size={16} />
                      </button>

                      <button
                        onClick={() => onOpenCert(course.id)}
                        style={{
                          border: '1px solid var(--cds-border)',
                          padding: '0 0.8rem',
                          borderRadius: 'var(--cds-radius-sm)',
                          color: 'var(--cds-navy)'
                        }}
                        title="View Certificate"
                      >
                        <Award size={18} color="#e59819" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Earned Certificates */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--cds-navy)', marginBottom: '1.25rem' }}>
          Accomplishments &amp; Verified Certificates (1)
        </h2>

        <div style={{ background: '#f8fafd', border: '1px solid #d0e2ff', borderRadius: 'var(--cds-radius-md)', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0056d2', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--cds-primary)', textTransform: 'uppercase' }}>
                Stanford Online &amp; DeepLearning.AI
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--cds-navy)', marginTop: '0.2rem' }}>
                Supervised Machine Learning: Regression and Classification
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--cds-text-secondary)', marginTop: '0.2rem' }}>
                Issued: October 2026 • Grade: 98.5% • Verification: COURSERA-VERIFIED-9B8A72
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenCert('machine-learning-specialization')}
            style={{
              background: '#ffffff',
              border: '2px solid var(--cds-primary)',
              color: 'var(--cds-primary)',
              fontWeight: 700,
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--cds-radius-sm)',
              fontSize: '0.9rem'
            }}
          >
            View Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
