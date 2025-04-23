import React, { useState } from 'react'
import './SignUp.css'

export default function SignUp ({ onBackToSignIn, onRegister }) {
  const [form, setForm] = useState({
    emailOrPhone: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    // TODO: call backend via props.onRegister(form)
    onRegister(form)
  }

  return (
    <div className='signup-container'>
      <h2 className='signup-title'>Sign Up</h2>
      <form className='signup-form' onSubmit={handleSubmit}>
        <label>
          <span>Email or Phone</span>
          <input
            type='text'
            name='emailOrPhone'
            value={form.emailOrPhone}
            onChange={handleChange}
            required
            className='signup-input'
            placeholder='you@example.com or +123456789'
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            required
            className='signup-input'
          />
        </label>
        <label>
          <span>Re-enter Password</span>
          <input
            type='password'
            name='confirmPassword'
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className='signup-input'
          />
        </label>
        {error && <p className='signup-error'>{error}</p>}
        <button type='submit' className='signup-button'>
          Create Account
        </button>
      </form>
      <p className='signin-link'>
        Already have an account?{' '}
        <button onClick={onBackToSignIn} className='link-button'>
          Sign In
        </button>
      </p>
    </div>
  )
}
