import React, { useState } from 'react'
import Galaxy from './Galaxy.jsx'
import { useGooeyAnimation } from '../hooks/useGooeyAnimation.js'
import '../styles/gooeyAnimation.css'

const AuthPage = ({ onAuthSuccess, onSkipAuth }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { containerRef: loginRef, triggerAnimation: triggerLogin } = useGooeyAnimation(10, '#fff')
  const { containerRef: signupRef, triggerAnimation: triggerSignup } = useGooeyAnimation(10, '#fff')
  const { containerRef: submitRef, triggerAnimation: triggerSubmit } = useGooeyAnimation(10, '#667eea')
  const { containerRef: guestRef, triggerAnimation: triggerGuest } = useGooeyAnimation(10, 'rgba(255,255,255,0.5)')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Simulate auth - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (isLogin) {
        // Login logic
        if (formData.email && formData.password) {
          const userName = formData.email.split('@')[0]
          localStorage.setItem('nyaya_user', JSON.stringify({ email: formData.email, name: userName }))
          onAuthSuccess({ email: formData.email, name: userName })
        } else {
          setError('Please enter email and password')
        }
      } else {
        // Signup logic
        if (formData.email && formData.password && formData.name) {
          localStorage.setItem('nyaya_user', JSON.stringify({ email: formData.email, name: formData.name }))
          onAuthSuccess({ email: formData.email, name: formData.name })
        } else {
          setError('Please fill all fields')
        }
      }
    } catch (err) {
      setError('Authentication failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '20px',
      background: '#000',
      overflow: 'hidden'
    }}>
      {/* Galaxy Background */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0 
      }}>
        <Galaxy 
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.2}
          saturation={0}
          hueShift={200}
          twinkleIntensity={0.4}
          rotationSpeed={0.05}
          starSpeed={0.3}
          speed={0.8}
        />
      </div>

      {/* Auth Card */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
            <img src="/03.svg" alt="Nyaya AI Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: '700', margin: 0 }}>
              Nyaya AI
            </h1>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
            Sovereign Legal Intelligence Platform
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <div className="gooey-button-wrapper" style={{ flex: 1, position: 'relative' }}>
            <div ref={loginRef} className="gooey-particle-container" />
            <button
              type="button"
              onClick={(e) => { triggerLogin(e); setIsLogin(true); }}
            style={{
              flex: 1,
              padding: '12px',
              background: isLogin ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              border: isLogin ? '2px solid rgba(255, 255, 255, 0.4)' : '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            }}
            >
              Login
            </button>
          </div>
          <div className="gooey-button-wrapper" style={{ flex: 1, position: 'relative' }}>
            <div ref={signupRef} className="gooey-particle-container" />
            <button
              type="button"
              onClick={(e) => { triggerSignup(e); setIsLogin(false); }}
            style={{
              flex: 1,
              padding: '12px',
              background: !isLogin ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              border: !isLogin ? '2px solid rgba(255, 255, 255, 0.4)' : '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            }}
            >
              Sign Up
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', marginBottom: '6px', display: 'block' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="off"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', marginBottom: '6px', display: 'block' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="off"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', marginBottom: '6px', display: 'block' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="off"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '12px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '13px',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <div className="gooey-button-wrapper" style={{ position: 'relative', width: '100%' }}>
            <div ref={submitRef} className="gooey-particle-container" />
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={(e) => { if (!isSubmitting) triggerSubmit(e); }}
            style={{
              width: '100%',
              padding: '14px',
              background: isSubmitting ? 'rgba(255, 255, 255, 0.2)' : '#fff',
              border: 'none',
              borderRadius: '8px',
              color: isSubmitting ? '#fff' : '#667eea',
              fontSize: '15px',
              fontWeight: '700',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
            }}
            >
              {isSubmitting ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: '#fff', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
          <div className="gooey-button-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
            <div ref={guestRef} className="gooey-particle-container" />
            <button
              type="button"
              onClick={(e) => { triggerGuest(e); onSkipAuth(); }}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            }}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
