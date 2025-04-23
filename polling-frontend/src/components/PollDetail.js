import React, { useState, useEffect } from 'react'
import './PollDetail.css'

export default function PollDetail ({ pollId, onSubmit, onBack }) {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    // Fetch all questions for this poll
    fetch(`/api/polls/${pollId}/questions/`)
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(console.error)
  }, [pollId]) // re-run if pollId changes

  const handleChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(answers)
  }

  return (
    <div className='poll-detail-container'>
      <button className='back-button' onClick={onBack}>
        ← Back to Dashboard
      </button>
      <h2 className='poll-detail-title'>Cast Your Vote</h2>
      <form className='poll-detail-form' onSubmit={handleSubmit}>
        <div className='questions-wrapper'>
          {questions.map(q => (
            <fieldset
              key={q.id}
              className='question-block'
              role='radiogroup'
              aria-labelledby={`question-${q.id}`}
            >
              <legend id={`question-${q.id}`} className='question-text'>
                {q.text}
              </legend>
              {q.options.map(opt => (
                <label key={opt.id} className='option-label'>
                  <input
                    type='radio'
                    name={`answer-${q.id}`}
                    value={opt.id}
                    checked={answers[q.id] === opt.id}
                    onChange={() => handleChange(q.id, opt.id)}
                    required
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </fieldset>
          ))}
        </div>
        <button type='submit' className='submit-button'>
          Submit Answers
        </button>
      </form>
    </div>
  )
}
