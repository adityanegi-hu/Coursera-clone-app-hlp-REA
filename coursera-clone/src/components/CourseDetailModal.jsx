import React, { useState } from 'react';
import { Star, CheckCircle, Clock, Globe, Award, ChevronDown, ChevronUp, PlayCircle, FileText, HelpCircle, ArrowLeft } from 'lucide-react';

export default function CourseDetailModal({
  course,
  onClose,
  onGoToClassroom,
  isEnrolled,
  onEnroll
}) {
  const [openWeek, setOpenWeek] = useState(1);

  if (!course) return null;

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Top Banner (Navy Dark) */}
      <div className="cds-xdp-header">
        <div className="cds-xdp-header-content">
          <div>
            <button
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '1.25rem',
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--cds-radius-sm)',
                background: 'rgba(255,255,255,0.1)'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Catalog</span>
            </button>

            <div className="cds-breadcrumbs">
              <span>Courses</span>
              <span>›</span>
              <span>{course.category}</span>
              <span>›</span>
              <span>{course.partner}</span>
            </div>

            <h1 className="cds-xdp-title">{course.title}</h1>

            <p className="cds-xdp-description">{course.description}</p>

            <div className="cds-instructor-pill">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="cds-instructor-avatar"
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>Taught by {course.instructor.name}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>{course.instructor.title}</div>
              </div>
            </div>

            <div className="cds-xdp-actions">
              {isEnrolled ? (
                <button
                  className="cds-enroll-btn"
                  onClick={() => onGoToClassroom(course)}
                >
                  Go to Classroom
                </button>
              ) : (
                <button
                  className="cds-enroll-btn"
                  onClick={() => {
                    onEnroll(course.id);
                    onGoToClassroom(course);
                  }}
                >
                  Enroll for Free
                </button>
              )}

              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                <strong>{course.enrolledCount}</strong> already enrolled
              </div>
            </div>
          </div>

          {/* Right Floating Stat Card */}
          <div className="cds-xdp-stats-card">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--cds-navy)', marginBottom: '1rem' }}>
              Course Information
            </h3>

            <div className="cds-stat-row">
              <Star className="cds-stat-icon" fill="var(--cds-star)" color="var(--cds-star)" />
              <div>
                <div style={{ fontWeight: 700 }}>{course.rating} / 5.0</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--cds-text-muted)' }}>{course.reviewsCount} reviews</div>
              </div>
            </div>

            <div className="cds-stat-row">
              <Clock className="cds-stat-icon" />
              <div>
                <div style={{ fontWeight: 700 }}>{course.duration}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--cds-text-muted)' }}>Learn at your own pace</div>
              </div>
            </div>

            <div className="cds-stat-row">
              <Award className="cds-stat-icon" />
              <div>
                <div style={{ fontWeight: 700 }}>Shareable Certificate</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--cds-text-muted)' }}>Add to LinkedIn profile</div>
              </div>
            </div>

            <div className="cds-stat-row">
              <Globe className="cds-stat-icon" />
              <div>
                <div style={{ fontWeight: 700 }}>100% Online &amp; Self-Paced</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--cds-text-muted)' }}>English, Spanish, French subtitles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="cds-main-container">
        {/* What You Will Learn */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cds-navy)', marginBottom: '1.25rem' }}>
            What you'll learn
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', background: 'var(--cds-bg-gray)', padding: '1.5rem', borderRadius: 'var(--cds-radius-md)', border: '1px solid var(--cds-border-light)' }}>
            {course.whatYouWillLearn.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem' }}>
                <CheckCircle size={18} color="var(--cds-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills You Gain */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cds-navy)', marginBottom: '1rem' }}>
            Skills you'll gain
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {course.skillsGained.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  background: 'var(--cds-primary-light)',
                  color: 'var(--cds-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--cds-radius-full)'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Syllabus / Modules Breakdown */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cds-navy)', marginBottom: '0.5rem' }}>
            Syllabus: What's in this course
          </h2>
          <p style={{ color: 'var(--cds-text-secondary)', marginBottom: '1.5rem' }}>
            {course.modules.length} weeks of study • Includes video lectures, readings, and practice quizzes
          </p>

          <div style={{ border: '1px solid var(--cds-border-light)', borderRadius: 'var(--cds-radius-md)', overflow: 'hidden' }}>
            {course.modules.map((mod) => {
              const isOpen = openWeek === mod.week;

              return (
                <div key={mod.id} style={{ borderBottom: '1px solid var(--cds-border-light)' }}>
                  <div
                    style={{
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: isOpen ? '#f8fafd' : '#ffffff'
                    }}
                    onClick={() => setOpenWeek(isOpen ? null : mod.week)}
                  >
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cds-primary)', textTransform: 'uppercase' }}>
                        Week {mod.week} • {mod.estimatedHours}
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--cds-navy)', marginTop: '0.2rem' }}>
                        {mod.title}
                      </h3>
                    </div>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>

                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', background: '#f8fafd' }}>
                      <p style={{ color: 'var(--cds-text-secondary)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                        {mod.description}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {mod.items.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.75rem 1rem',
                              background: '#ffffff',
                              borderRadius: 'var(--cds-radius-sm)',
                              border: '1px solid var(--cds-border-light)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              {item.type === 'video' && <PlayCircle size={18} color="var(--cds-primary)" />}
                              {item.type === 'reading' && <FileText size={18} color="#e59819" />}
                              {item.type === 'quiz' && <HelpCircle size={18} color="var(--cds-green)" />}
                              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.title}</span>
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--cds-text-muted)' }}>
                              {item.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Instructor Full Card */}
        <section>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cds-navy)', marginBottom: '1.25rem' }}>
            Instructor
          </h2>
          <div style={{ display: 'flex', gap: '1.5rem', background: 'var(--cds-bg-gray)', padding: '2rem', borderRadius: 'var(--cds-radius-md)', border: '1px solid var(--cds-border-light)' }}>
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--cds-navy)' }}>
                {course.instructor.name}
              </h3>
              <p style={{ color: 'var(--cds-primary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                {course.instructor.title}
              </p>
              <p style={{ color: 'var(--cds-text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {course.instructor.bio}
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--cds-text-muted)', fontWeight: 600 }}>
                <span>📚 {course.instructor.coursesCount} Courses</span>
                <span>👥 {course.instructor.learnersCount} Learners</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
