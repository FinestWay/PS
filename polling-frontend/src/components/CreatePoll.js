import React, { useState } from 'react'
import './CreatePoll.css'

export default function CreatePoll ({ onPublish, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState(['', ''])

  const handleOptionChange = (idx, val) => {
    setOptions(opts => opts.map((o, i) => (i === idx ? val : o)))
  }

  const addOption = () => {
    setOptions(opts => [...opts, ''])
  }

  const handleSubmit = e => {
    e.preventDefault()
    onPublish({ title, description, options })
  }

  return (
    <div className='createpoll-container'>
      <button className='cancel-button' onClick={onCancel}>
        ← Back
      </button>
      <h2 className='createpoll-title'>Create New Poll</h2>
      <form className='createpoll-form' onSubmit={handleSubmit}>
        <label>
          <span>Poll Title</span>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className='cp-input'
          />
        </label>
        <div className='options-section'>
          <span>Options</span>
          {options.map((opt, i) => (
            <input
              key={i}
              type='text'
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={e => handleOptionChange(i, e.target.value)}
              required
              className='cp-input'
            />
          ))}
          <button type='button' className='add-option' onClick={addOption}>
            + Add Option
          </button>
        </div>
        <button type='submit' className='publish-button'>
          Publish Poll
        </button>
      </form>
    </div>
  )
}
