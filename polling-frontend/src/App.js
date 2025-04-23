// src/App.js
import React, { useState } from 'react'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/DashBoard'

function App () {
  const [view, setView] = useState('signin')
  const handleLogin = () => setView('dashboard')
  const handleRegister = () => setView('dashboard')
  const handleCreatePoll = () => setView('create')
  const handleSelectPoll = id => setView(`detail-${id}`)

  return (
    <div>
      {view === 'signin' && (
        <SignIn onSignUpClick={() => setView('signup')} onLogin={handleLogin} />
      )}
      {view === 'signup' && (
        <SignUp
          onBackToSignIn={() => setView('signin')}
          onRegister={handleRegister}
        />
      )}
      {view === 'dashboard' && (
        <Dashboard
          onCreatePoll={handleCreatePoll}
          onSelectPoll={handleSelectPoll}
        />
      )}
      {/* Future: view==='create' && <CreatePoll/> */}
      {/* Future: view.startsWith('detail-') && <PollDetail id={view.split('-')[1]} /> */}
    </div>
  )
}

export default App
