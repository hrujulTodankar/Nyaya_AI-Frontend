import React, { useState } from 'react'

const procedureData = {
  India: [
    { step: 1, title: 'File FIR/Complaint', description: 'File First Information Report at police station or complaint at magistrate court', duration: '1 day' },
    { step: 2, title: 'Investigation', description: 'Police investigation and evidence collection', duration: '60-90 days' },
    { step: 3, title: 'Chargesheet Filing', description: 'Police files chargesheet with evidence', duration: '90 days' },
    { step: 4, title: 'Trial Court Proceedings', description: 'Arguments, witness examination, and judgment', duration: '1-3 years' },
    { step: 5, title: 'Appeal (if needed)', description: 'Appeal to High Court or Supreme Court', duration: '2-5 years' }
  ],
  UK: [
    { step: 1, title: 'Report to Police', description: 'Report crime to local police station', duration: '1 day' },
    { step: 2, title: 'Investigation', description: 'Police investigation and evidence gathering', duration: '30-60 days' },
    { step: 3, title: 'CPS Review', description: 'Crown Prosecution Service reviews case', duration: '14-28 days' },
    { step: 4, title: 'Magistrates/Crown Court', description: 'Trial proceedings and judgment', duration: '6-12 months' },
    { step: 5, title: 'Appeal', description: 'Appeal to Court of Appeal if needed', duration: '1-2 years' }
  ],
  UAE: [
    { step: 1, title: 'File Complaint', description: 'File complaint at police station or public prosecution', duration: '1 day' },
    { step: 2, title: 'Investigation', description: 'Police and prosecution investigation', duration: '30-45 days' },
    { step: 3, title: 'Prosecution Decision', description: 'Public prosecution decides to proceed', duration: '7-14 days' },
    { step: 4, title: 'Court of First Instance', description: 'Trial and judgment', duration: '3-6 months' },
    { step: 5, title: 'Appeal', description: 'Appeal to Court of Appeal and Cassation', duration: '6-12 months' }
  ]
}

const JurisdictionProcedure = ({ onBack }) => {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('India')
  const [currentStep, setCurrentStep] = useState(0)

  const procedures = procedureData[selectedJurisdiction]

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={onBack}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '10px 20px',
          color: '#fff',
          cursor: 'pointer',
          marginBottom: '20px',
          fontSize: '14px'
        }}
      >
        ← Back to Dashboard
      </button>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '32px'
      }}>
        <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '24px' }}>Jurisdiction Procedure Navigator</h2>

        {/* Jurisdiction Selector */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          {['India', 'UK', 'UAE'].map(jurisdiction => (
            <button
              key={jurisdiction}
              onClick={() => {
                setSelectedJurisdiction(jurisdiction)
                setCurrentStep(0)
              }}
              style={{
                padding: '12px 24px',
                border: selectedJurisdiction === jurisdiction ? '2px solid #8b5cf6' : '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                background: selectedJurisdiction === jurisdiction ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {jurisdiction}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            {procedures.map((proc, idx) => (
              <div
                key={idx}
                style={{
                  width: '18%',
                  height: '4px',
                  background: idx <= currentStep ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px'
                }}
              />
            ))}
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', textAlign: 'center' }}>
            Step {currentStep + 1} of {procedures.length}
          </p>
        </div>

        {/* Current Step Display */}
        <div style={{
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#8b5cf6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '700',
              color: '#fff'
            }}>
              {procedures[currentStep].step}
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '20px', margin: 0 }}>{procedures[currentStep].title}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', margin: '4px 0 0 0' }}>
                Duration: {procedures[currentStep].duration}
              </p>
            </div>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            {procedures[currentStep].description}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            style={{
              padding: '12px 24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              background: currentStep === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
              color: currentStep === 0 ? 'rgba(255, 255, 255, 0.3)' : '#fff',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Previous Step
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(procedures.length - 1, currentStep + 1))}
            disabled={currentStep === procedures.length - 1}
            style={{
              padding: '12px 24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              background: currentStep === procedures.length - 1 ? 'rgba(255, 255, 255, 0.05)' : '#8b5cf6',
              color: currentStep === procedures.length - 1 ? 'rgba(255, 255, 255, 0.3)' : '#fff',
              cursor: currentStep === procedures.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Next Step
          </button>
        </div>

        {/* All Steps Overview */}
        <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '16px' }}>Complete Procedure Overview</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {procedures.map((proc, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentStep(idx)}
                style={{
                  padding: '16px',
                  background: idx === currentStep ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: idx === currentStep ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: idx <= currentStep ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#fff'
                  }}>
                    {proc.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ color: '#fff', fontSize: '14px', margin: 0 }}>{proc.title}</h5>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', margin: '4px 0 0 0' }}>
                      {proc.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JurisdictionProcedure
