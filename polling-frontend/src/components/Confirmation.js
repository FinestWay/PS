import React from 'react'
import './Confirmation.css'

export default function Confirmation ({ onBack }) {
  return (
    <div className='confirmation-container'>
      <svg
        className='confirmation-icon'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <circle cx='12' cy='12' r='10' fill='#27ae60' />
        <path
          d='M16 9l-5 5-3-3'
          stroke='#fff'
          strokeWidth='2'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <h2 className='confirmation-title'>Poll Submitted!</h2>
      <p className='confirmation-message'>
        Thank you for sharing your opinion. Your responses have been recorded.
      </p>
      <button className='back-button' onClick={onBack}>
        Back to Dashboard
      </button>
    </div>
  )
}
