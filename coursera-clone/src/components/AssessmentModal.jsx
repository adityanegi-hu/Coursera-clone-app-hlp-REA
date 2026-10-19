import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, X, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AssessmentModal({
  quizItem,
  onClose,
  onPassQuiz
}) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scoreData, setScoreData] = useState(null);

  if (!quizItem || !quizItem.questions) return null;

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qId]: optionIdx
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let correctCount = 0;
    quizItem.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / quizItem.questions.length) * 100);
    const passed = percentage >= quizItem.passingScore;

    setScoreData({
      percentage,
      passed,
      correctCount,
      totalCount: quizItem.questions.length
    });
    setSubmitted(true);

    if (passed) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      onPassQuiz(quizItem.id, percentage);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScoreData(null);
  };

  const allAnswered = quizItem.questions.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="cds-modal-overlay">
      <div className="cds-quiz-modal">
        {/* Header */}
        <div className="cds-quiz-header">
          <div>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.5px' }}>
              Practice Assessment • Passing Grade: {quizItem.passingScore}%
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.2rem' }}>
              {quizItem.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ color: '#ffffff', opacity: 0.8, padding: '0.4rem', borderRadius: '50%' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="cds-quiz-body">
          {/* Result Banner if submitted */}
          {submitted && scoreData && (
            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--cds-radius-md)',
                marginBottom: '2rem',
                background: scoreData.passed ? '#e6f4ea' : '#fce8e6',
                border: `2px solid ${scoreData.passed ? '#34a853' : '#ea4335'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {scoreData.passed ? (
                  <CheckCircle2 size={36} color="#137333" />
                ) : (
                  <AlertCircle size={36} color="#c5221f" />
                )}
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: scoreData.passed ? '#137333' : '#c5221f' }}>
                    {scoreData.passed ? 'Congratulations, you passed!' : 'Keep learning and try again.'}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--cds-text-main)', marginTop: '0.25rem' }}>
                    Your Grade: <strong>{scoreData.percentage}%</strong> ({scoreData.correctCount}/{scoreData.totalCount} correct). Passing threshold is {quizItem.passingScore}%.
                  </p>
                </div>
              </div>

              {!scoreData.passed && (
                <button
                  onClick={handleRetake}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#ffffff',
                    border: '1px solid #ea4335',
                    color: '#ea4335',
                    fontWeight: 700,
                    padding: '0.6rem 1.1rem',
                    borderRadius: 'var(--cds-radius-sm)'
                  }}
                >
                  <RotateCcw size={16} />
                  <span>Retake</span>
                </button>
              )}
            </div>
          )}

          {/* Question List */}
          <form onSubmit={handleSubmit}>
            {quizItem.questions.map((q, qIndex) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;

              return (
                <div key={q.id} className="cds-question-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--cds-text-muted)' }}>
                      Question {qIndex + 1} of {quizItem.questions.length} • 1 Point
                    </span>
                    {submitted && (
                      <span
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: isCorrect ? '#137333' : '#c5221f',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 size={16} /> Correct (1/1)
                          </>
                        ) : (
                          <>
                            <XCircle size={16} /> Incorrect (0/1)
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <h3 className="cds-question-title">{q.question}</h3>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedOpt === oIdx;

                      return (
                        <div
                          key={oIdx}
                          className={`cds-option-label ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                        >
                          <input
                            type="radio"
                            name={`q_${q.id}`}
                            checked={isSelected}
                            onChange={() => handleSelectOption(q.id, oIdx)}
                            disabled={submitted}
                            style={{ marginTop: '3px' }}
                          />
                          <span style={{ fontSize: '0.95rem', color: 'var(--cds-text-main)' }}>
                            {opt}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Feedback explanation */}
                  {submitted && (
                    <div className={`cds-explanation-box ${isCorrect ? 'correct' : 'incorrect'}`}>
                      <strong>{isCorrect ? 'Well done!' : 'Explanation:'} </strong>
                      <span>{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Footer Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  color: 'var(--cds-text-main)',
                  border: '1px solid var(--cds-border)',
                  borderRadius: 'var(--cds-radius-sm)'
                }}
              >
                Close
              </button>

              {!submitted ? (
                <button
                  type="submit"
                  disabled={!allAnswered}
                  style={{
                    background: allAnswered ? 'var(--cds-primary)' : 'var(--cds-border)',
                    color: '#ffffff',
                    fontWeight: 700,
                    padding: '0.75rem 2rem',
                    borderRadius: 'var(--cds-radius-sm)',
                    cursor: allAnswered ? 'pointer' : 'not-allowed'
                  }}
                >
                  Submit Assessment
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'var(--cds-green)',
                    color: '#ffffff',
                    fontWeight: 700,
                    padding: '0.75rem 2rem',
                    borderRadius: 'var(--cds-radius-sm)'
                  }}
                >
                  Done
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
