import React, { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './DashBoard.css'

export default function Dashboard ({ onCreatePoll, onSelectPoll }) {
  const [polls, setPolls] = useState([])

  useEffect(() => {
    // Fetch ongoing polls from Django backend
    fetch('/api/polls/ongoing/')
      .then(res => res.json())
      .then(data => setPolls(data))
      .catch(console.error)
  }, [])

  return (
    <div className='dashboard-container'>
      <header className='dashboard-header'>
        <h2>Ongoing Polls</h2>
        <button className='create-button' onClick={onCreatePoll}>
          + Create Poll
        </button>
      </header>
      <TransitionGroup className='poll-list'>
        {polls.map(poll => (
          <CSSTransition key={poll.id} timeout={300} classNames='fade'>
            <div className='poll-card' onClick={() => onSelectPoll(poll.id)}>
              <h3 className='poll-title'>{poll.title}</h3>
              <p className='poll-desc'>{poll.description}</p>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}
