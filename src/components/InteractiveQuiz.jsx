import React, { useState } from 'react';
import PageHeader from './PageHeader';

const quizQuestions = [
  {
    question: 'Roughly how many people in sub-Saharan Africa still lack access to safely managed drinking water?',
    options: ['~50 million', '~200 million', '~400 million', 'Over 700 million'],
    answer: 'Over 700 million',
  },
  {
    question: 'Which of these is a primary focus of HUFIDA’s health programmes?',
    options: ['Space research', 'Community health outreach', 'Currency trading', 'Luxury tourism'],
    answer: 'Community health outreach',
  },
  {
    question: 'Girls’ education is closely linked to which long-term outcome?',
    options: ['Higher child mortality', 'Lower household income', 'Improved community health and income', 'No measurable effect'],
    answer: 'Improved community health and income',
  },
  {
    question: 'HUFIDA is primarily rooted in which region?',
    options: ['Southeast Asia', 'Central and West Africa', 'The Andes', 'The Arctic'],
    answer: 'Central and West Africa',
  },
];

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const q = quizQuestions[currentQuestion];
  const progress = ((currentQuestion) / quizQuestions.length) * 100;

  const handleAnswer = (option) => {
    const isCorrect = option === q.answer;
    if (isCorrect) setScore((s) => s + 1);
    const next = currentQuestion + 1;
    if (next < quizQuestions.length) setCurrentQuestion(next);
    else setShowScore(true);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="How much do you know about development in Africa?"
        lead="A short quiz drawn from the themes HUFIDA works on every day — water, health, education, and community."
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-2xl px-4 py-16">
          {showScore ? (
            <div className="text-center">
              <p className="eyebrow">Your result</p>
              <hr className="rule-gold mx-auto" />
              <h2 className="font-display text-5xl text-emerald-deep mt-4">
                {score} / {quizQuestions.length}
              </h2>
              <p className="mt-4 text-ink-soft">
                {score === quizQuestions.length
                  ? 'Excellent — you know the landscape well.'
                  : score >= quizQuestions.length / 2
                  ? 'A solid start. Explore our projects to go deeper.'
                  : 'Plenty to discover — browse our stories and reports.'}
              </p>
              <button
                onClick={restart}
                className="mt-8 inline-block border border-line px-6 py-2 text-sm tracking-wide text-ink hover:border-gold transition"
              >
                Restart quiz
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-xs tracking-widest uppercase text-ink-soft mb-3">
                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                <span>Score {score}</span>
              </div>
              <div className="h-px bg-line mb-8 relative">
                <div
                  className="absolute inset-y-0 left-0 bg-gold"
                  style={{ width: `${progress}%`, height: '2px', top: '-1px' }}
                />
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug">
                {q.question}
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-3">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="text-left border border-line bg-parchment/40 px-5 py-4 hover:border-gold hover:bg-parchment transition"
                  >
                    <span className="text-ink">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default InteractiveQuiz;
