import React, { useState } from 'react'
import './SignIn.css'

export default function SignIn ({ onSignUpClick, onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  // Controlled inputs ensure React state sync :contentReference[oaicite:5]{index=5}

  const handleChange = e => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onLogin(credentials)
  }

  return (
    <div className='signin-container'>
      <h2 className='signin-title'>Sign In</h2>
      <form className='signin-form' onSubmit={handleSubmit}>
        <label>
          <span>Username</span>
          <input
            type='text'
            name='username'
            value={credentials.username}
            onChange={handleChange}
            required
            className='signin-input'
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type='password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
            required
            className='signin-input'
          />
        </label>
        <button type='submit' className='signin-button'>
          Log In
        </button>
      </form>
      <p className='signup-link'>
        Don’t have an account?{' '}
        <button onClick={onSignUpClick} className='link-button'>
          Sign Up
        </button>
      </p>
    </div>
  )
}
