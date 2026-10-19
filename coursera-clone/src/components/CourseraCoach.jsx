import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, MessageCircle } from 'lucide-react';

export default function CourseraCoach({ contextTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'coach',
      text: `Hello! I'm your Coursera Coach. I can explain complex formulas, quiz you on concepts, or summarize "${contextTitle || 'Machine Learning'}". What would you like to explore?`
    }
  ]);

  const quickPrompts = [
    'Explain Gradient Descent simply',
    'What is the Cost Function J(w,b)?',
    'Give me a practice question'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setInputVal('');

    // Generate intelligent contextual response
    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('gradient descent')) {
        reply = `Imagine standing on top of a foggy mountain and wanting to get to the very lowest valley. Since you can't see far ahead, you feel the slope beneath your feet and take a step downhill in the direction of the steepest descent. Repeating this step until the ground is flat is exactly how Gradient Descent finds the minimum of our Cost Function! 🏔️`;
      } else if (lower.includes('cost function') || lower.includes('j(w,b)')) {
        reply = `The Cost Function $J(w,b)$ is our model's "error score". It calculates the squared difference between the model's prediction $\\hat{y}$ and the real target $y$. Our goal during training is to adjust $w$ (weights) and $b$ (bias) so that this cost score reaches the smallest possible number.`;
      } else if (lower.includes('practice') || lower.includes('quiz')) {
        reply = `Here is a quick check: In linear regression, if we double our learning rate $\\alpha$ and notice the cost $J(w,b)$ increases on every iteration instead of decreasing, what should we do with $\\alpha$?\n\n(Hint: Think about step size and divergence!)`;
      } else {
        reply = `Great question about "${query}". In Machine Learning, key breakthroughs come from balancing feature representation with optimization algorithms. Would you like me to walk through the Python NumPy vectorization or explain the mathematical derivation?`;
      }

      setMessages((prev) => [...prev, { sender: 'coach', text: reply }]);
    }, 600);
  };

  return (
    <div className="cds-coach-widget">
      {!isOpen ? (
        <button className="cds-coach-fab" onClick={() => setIsOpen(true)}>
          <Sparkles size={18} />
          <span>Coursera Coach</span>
        </button>
      ) : (
        <div className="cds-coach-window">
          {/* Header */}
          <div className="cds-coach-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ background: '#0056d2', padding: '4px', borderRadius: '50%' }}>
                <Bot size={18} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Coursera Coach</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>AI Learning Assistant</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: '#ffffff' }}>
              <X size={18} />
            </button>
          </div>

          {/* Quick Prompts */}
          <div style={{ padding: '0.6rem 0.75rem', background: '#f0f4f9', display: 'flex', gap: '0.4rem', overflowX: 'auto', borderBottom: '1px solid var(--cds-border-light)' }}>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  background: '#ffffff',
                  border: '1px solid var(--cds-border)',
                  borderRadius: '12px',
                  padding: '0.25rem 0.6rem',
                  color: 'var(--cds-primary)'
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="cds-coach-messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`cds-coach-msg ${m.sender}`}>
                <div style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="cds-coach-input-bar"
          >
            <input
              type="text"
              placeholder="Ask your coach anything..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{
                flex: 1,
                border: '1px solid var(--cds-border)',
                borderRadius: 'var(--cds-radius-full)',
                padding: '0.5rem 0.85rem',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--cds-primary)',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
