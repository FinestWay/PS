import React, { useState, useEffect } from 'react'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/DashBoard'
import CreatePoll from './components/CreatePoll'
import PollDetail from './components/PollDetail'
import Confirmation from './components/Confirmation'

function App () {
  const [view, setView] = useState('signin')
  const [polls, setPolls] = useState([])
  const [activePollId, setActivePollId] = useState(null)

  // Fetch ongoing polls from backend
  const fetchPolls = () => {
    fetch('/api/polls/ongoing/')
      .then(res => res.json())
      .then(setPolls)
      .catch(console.error)
  }

  // Initial load of polls
  useEffect(fetchPolls, [])

  // Screen transition handlers
  const handleLogin = () => setView('dashboard')
  const handleSignUp = () => setView('dashboard')
  const handleBackToSignIn = () => setView('signin')
  const handleCreateClick = () => setView('createPoll')
  const handleBackToDashboard = () => {
    fetchPolls() // refresh after returning
    setView('dashboard')
  }

  const handlePublish = newPoll => {
    // TODO: POST newPoll to Django backend…
    fetchPolls() // then refresh list
    setView('dashboard')
  }

  const handleSelectPoll = pollId => {
    const selectedPoll = polls.find(poll => poll.id === pollId)
    setActivePollId(selectedPoll)
    setView('pollDetail')
  }

  const handleSubmitAnswers = answers => {
    // TODO: POST answers to /api/polls/{activePollId}/vote/
    setView('confirmation')
  }

  const handleBackFromConfirmation = () => {
    fetchPolls()
    setView('dashboard')
  }

  return (
    <div className='app-root'>
      {view === 'signin' && (
        <SignIn onLogin={handleLogin} onSignUpClick={() => setView('signup')} />
      )}

      {view === 'signup' && (
        <SignUp onRegister={handleSignUp} onBackToSignIn={handleBackToSignIn} />
      )}

      {view === 'dashboard' && (
        <Dashboard
          polls={polls}
          onCreatePoll={handleCreateClick}
          onSelectPoll={handleSelectPoll}
        />
      )}

      {view === 'createPoll' && (
        <CreatePoll
          onPublish={handlePublish}
          onCancel={handleBackToDashboard}
        />
      )}

      {view === 'pollDetail' && activePollId (
        <PollDetail
          pollId={activePollId}
          onSubmit={handleSubmitAnswers}
          onBack={handleBackToDashboard}
        />
      )}

      {view === 'confirmation' && (
        <Confirmation onBack={handleBackFromConfirmation} />
      )}
    </div>
  )
}

export default App
