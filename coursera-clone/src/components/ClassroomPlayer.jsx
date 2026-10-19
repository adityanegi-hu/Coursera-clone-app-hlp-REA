import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  FileText,
  HelpCircle,
  MessageSquare,
  Bookmark,
  FileCode,
  ThumbsUp,
  Share2,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';

export default function ClassroomPlayer({
  course,
  onBack,
  userState,
  onCompleteItem,
  onOpenQuiz,
  onOpenCoach,
  onOpenCert
}) {
  // Find first module and item
  const initialItem = course.modules?.[0]?.items?.[0] || null;
  const [activeItem, setActiveItem] = useState(initialItem);
  const [activeTab, setActiveTab] = useState('transcript'); // transcript | notes | discussions | reading
  const [videoTime, setVideoTime] = useState(0);
  const [newNoteText, setNewNoteText] = useState('');
  const [userNotes, setUserNotes] = useState(initialItem?.notesDefault || []);
  const [discussions, setDiscussions] = useState(course.discussions || []);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionBody, setNewQuestionBody] = useState('');
  const [showAskForm, setShowAskForm] = useState(false);

  const videoRef = useRef(null);

  // When active item changes, reset notes
  useEffect(() => {
    if (activeItem?.notesDefault) {
      setUserNotes(activeItem.notesDefault);
    } else {
      setUserNotes([]);
    }
  }, [activeItem]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const note = {
      id: Date.now().toString(),
      timestamp: Math.floor(videoTime),
      noteText: newNoteText.trim()
    };

    setUserNotes([note, ...userNotes]);
    setNewNoteText('');
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionTitle.trim()) return;

    const newQ = {
      id: Date.now().toString(),
      author: userState.name,
      timeAgo: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
      title: newQuestionTitle.trim(),
      body: newQuestionBody.trim() || newQuestionTitle.trim(),
      upvotes: 1,
      repliesCount: 0,
      answers: []
    };

    setDiscussions([newQ, ...discussions]);
    setNewQuestionTitle('');
    setNewQuestionBody('');
    setShowAskForm(false);
  };

  const handleUpvote = (id) => {
    setDiscussions(
      discussions.map((d) => (d.id === id ? { ...d, upvotes: d.upvotes + 1 } : d))
    );
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isCompleted = (itemId) => userState.completedItemIds.includes(itemId);

  return (
    <div className="cds-classroom">
      {/* ================= LEFT SYLLABUS DRAWER ================= */}
      <aside className="cds-classroom-sidebar">
        <div className="cds-sidebar-header">
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}
          >
            <ArrowLeft size={18} />
            <span>Course Home</span>
          </button>

          <button
            onClick={() => onOpenCert(course.id)}
            style={{
              color: '#e59819',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
            title="View Course Certificate"
          >
            <Award size={16} />
            <span>Certificate</span>
          </button>
        </div>

        <div className="cds-module-list">
          {course.modules.map((mod) => (
            <div key={mod.id} className="cds-module-accordion">
              <div className="cds-module-header">
                <span>Week {mod.week}: {mod.title}</span>
              </div>

              <div>
                {mod.items.map((item) => {
                  const completed = isCompleted(item.id);
                  const active = activeItem?.id === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`cds-item-row ${active ? 'active' : ''}`}
                      onClick={() => {
                        setActiveItem(item);
                        if (item.type === 'quiz') {
                          onOpenQuiz(item);
                        }
                      }}
                    >
                      <div className={`cds-item-check ${completed ? 'completed' : ''}`}>
                        {completed && <CheckCircle size={14} />}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          {item.type === 'video' && <PlayCircle size={14} color="#58a6ff" />}
                          {item.type === 'reading' && <FileText size={14} color="#e59819" />}
                          {item.type === 'quiz' && <HelpCircle size={14} color="#00e676" />}
                          <span style={{ fontSize: '0.85rem' }}>{item.title}</span>
                        </div>
                      </div>

                      <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>
                        {item.duration}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ================= MAIN CLASSROOM VIEW ================= */}
      <main className="cds-classroom-main">
        {/* Top Lesson Title Bar */}
        <div
          style={{
            background: '#161b22',
            padding: '0.85rem 1.5rem',
            borderBottom: '1px solid #30363d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', color: '#58a6ff', fontWeight: 700, textTransform: 'uppercase' }}>
              {activeItem?.type?.toUpperCase()}
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
              {activeItem?.title}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {activeItem && !isCompleted(activeItem.id) && (
              <button
                onClick={() => onCompleteItem(activeItem.id)}
                style={{
                  background: 'var(--cds-green)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--cds-radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <CheckCircle size={15} />
                <span>Mark Completed</span>
              </button>
            )}

            <button
              onClick={() => onOpenCoach(activeItem?.title || course.title)}
              style={{
                background: 'rgba(0, 86, 210, 0.4)',
                border: '1px solid #58a6ff',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 700,
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--cds-radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Sparkles size={15} color="#58a6ff" />
              <span>Ask Coursera Coach</span>
            </button>
          </div>
        </div>

        {/* Video Player or Reading View */}
        {activeItem?.type === 'video' ? (
          <div className="cds-video-wrapper">
            <video
              ref={videoRef}
              src={activeItem.videoUrl}
              className="cds-video-element"
              controls
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => onCompleteItem(activeItem.id)}
            />
          </div>
        ) : activeItem?.type === 'quiz' ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: '#161b22', margin: '2rem', borderRadius: '8px' }}>
            <HelpCircle size={56} color="#00e676" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.5rem' }}>{activeItem.title}</h2>
            <p style={{ color: '#8b949e', marginBottom: '1.5rem' }}>
              Test your knowledge. Passing grade is {activeItem.passingScore}%.
            </p>
            <button
              onClick={() => onOpenQuiz(activeItem)}
              className="cds-enroll-btn"
              style={{ padding: '0.8rem 2rem' }}
            >
              Launch Assessment
            </button>
          </div>
        ) : (
          <div style={{ padding: '2rem 3rem', background: '#0d1117', color: '#c9d1d9', lineHeight: 1.8 }}>
            <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
              {activeItem?.content}
            </div>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="cds-classroom-tabs">
          <button
            className={`cds-classroom-tab-btn ${activeTab === 'transcript' ? 'active' : ''}`}
            onClick={() => setActiveTab('transcript')}
          >
            <FileCode size={16} />
            <span>Interactive Transcript</span>
          </button>

          <button
            className={`cds-classroom-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <Bookmark size={16} />
            <span>Notes ({userNotes.length})</span>
          </button>

          <button
            className={`cds-classroom-tab-btn ${activeTab === 'discussions' ? 'active' : ''}`}
            onClick={() => setActiveTab('discussions')}
          >
            <MessageSquare size={16} />
            <span>Discussions ({discussions.length})</span>
          </button>
        </div>

        {/* Tab Panel Content */}
        <div className="cds-tab-panel">
          {/* TAB 1: TRANSCRIPT */}
          {activeTab === 'transcript' && (
            <div>
              <p style={{ color: '#8b949e', fontSize: '0.85rem', marginBottom: '1rem' }}>
                💡 Click any timestamp or sentence below to seek the video directly to that point.
              </p>

              {activeItem?.transcript && activeItem.transcript.length > 0 ? (
                <div>
                  {activeItem.transcript.map((line, idx) => {
                    const nextLine = activeItem.transcript[idx + 1];
                    const isActive =
                      videoTime >= line.time && (!nextLine || videoTime < nextLine.time);

                    return (
                      <div
                        key={idx}
                        className={`cds-transcript-line ${isActive ? 'active' : ''}`}
                        onClick={() => handleSeek(line.time)}
                      >
                        <span className="cds-transcript-time">{formatTime(line.time)}</span>
                        <span>{line.text}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ color: '#8b949e', padding: '1rem 0' }}>
                  Transcript available for video lectures.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: NOTES */}
          {activeTab === 'notes' && (
            <div>
              <form onSubmit={handleSaveNote} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder={`Save personal note at ${formatTime(videoTime)}...`}
                    style={{
                      flex: 1,
                      padding: '0.75rem 1rem',
                      background: '#161b22',
                      border: '1px solid #30363d',
                      borderRadius: 'var(--cds-radius-sm)',
                      color: '#ffffff',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'var(--cds-primary)',
                      color: '#ffffff',
                      fontWeight: 700,
                      padding: '0 1.25rem',
                      borderRadius: 'var(--cds-radius-sm)'
                    }}
                  >
                    Save Note
                  </button>
                </div>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {userNotes.map((note) => (
                  <div
                    key={note.id}
                    style={{
                      background: '#161b22',
                      border: '1px solid #30363d',
                      borderRadius: 'var(--cds-radius-sm)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <button
                        onClick={() => handleSeek(note.timestamp)}
                        style={{
                          color: '#58a6ff',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          marginBottom: '0.25rem'
                        }}
                      >
                        <Clock size={14} />
                        <span>{formatTime(note.timestamp)}</span>
                      </button>
                      <p style={{ color: '#e6edf3', fontSize: '0.95rem' }}>{note.noteText}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DISCUSSIONS */}
          {activeTab === 'discussions' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Learner Community Q&amp;A</h3>
                <button
                  onClick={() => setShowAskForm(!showAskForm)}
                  style={{
                    background: '#238636',
                    color: '#ffffff',
                    fontWeight: 700,
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--cds-radius-sm)',
                    fontSize: '0.85rem'
                  }}
                >
                  {showAskForm ? 'Cancel' : '+ Ask a Question'}
                </button>
              </div>

              {showAskForm && (
                <form onSubmit={handleAddQuestion} style={{ background: '#161b22', padding: '1rem', borderRadius: '6px', border: '1px solid #30363d', marginBottom: '1.5rem' }}>
                  <input
                    type="text"
                    placeholder="Question title..."
                    value={newQuestionTitle}
                    onChange={(e) => setNewQuestionTitle(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', background: '#0d1117', border: '1px solid #30363d', color: '#ffffff', borderRadius: '4px', marginBottom: '0.75rem', outline: 'none' }}
                  />
                  <textarea
                    rows={3}
                    placeholder="Add details, what you've tried..."
                    value={newQuestionBody}
                    onChange={(e) => setNewQuestionBody(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', background: '#0d1117', border: '1px solid #30363d', color: '#ffffff', borderRadius: '4px', marginBottom: '0.75rem', outline: 'none' }}
                  />
                  <button
                    type="submit"
                    style={{ background: 'var(--cds-primary)', color: '#ffffff', fontWeight: 700, padding: '0.5rem 1.25rem', borderRadius: '4px' }}
                  >
                    Post to Forum
                  </button>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {discussions.map((d) => (
                  <div
                    key={d.id}
                    style={{
                      background: '#161b22',
                      border: '1px solid #30363d',
                      borderRadius: 'var(--cds-radius-sm)',
                      padding: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <img
                          src={d.avatar}
                          alt={d.author}
                          style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: '#ffffff' }}>{d.author}</div>
                          <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>{d.timeAgo}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleUpvote(d.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          background: '#21262d',
                          padding: '0.35rem 0.75rem',
                          borderRadius: 'var(--cds-radius-full)',
                          color: '#58a6ff',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          border: '1px solid #30363d'
                        }}
                      >
                        <ThumbsUp size={14} />
                        <span>{d.upvotes}</span>
                      </button>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#e6edf3', marginTop: '0.75rem', marginBottom: '0.35rem' }}>
                      {d.title}
                    </h4>
                    <p style={{ color: '#8b949e', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      {d.body}
                    </p>

                    {d.answers && d.answers.length > 0 && (
                      <div style={{ marginTop: '1rem', padding: '0.85rem', background: '#0d1117', borderLeft: '3px solid #58a6ff', borderRadius: '4px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#58a6ff', marginBottom: '0.3rem' }}>
                          ✓ Endorsed Answer by {d.answers[0].author}
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#c9d1d9' }}>{d.answers[0].body}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
