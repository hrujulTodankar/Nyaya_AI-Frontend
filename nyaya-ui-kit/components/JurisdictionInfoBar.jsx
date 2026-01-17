import React from 'react';

const JurisdictionInfoBar = ({ country, courtSystem, authorityFraming, emergencyGuidance }) => {
  // Error handling for missing required data
  if (!country || !courtSystem || !authorityFraming || !emergencyGuidance) {
    return (
      <div className="consultation-card">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3 style={{ color: '#dc3545', marginBottom: '10px' }}>Data Error</h3>
          <p style={{ color: '#6c757d' }}>
            Unable to display jurisdiction information due to missing required data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="consultation-card">
      <h2 style={{
        fontSize: '1.5rem',
        color: '#2c3e50',
        marginBottom: '20px',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        Jurisdiction Information
      </h2>

      {/* Horizontal bar layout for jurisdiction info */}
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
        {/* Country */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div className="section-label">Country</div>
          <p style={{
            color: '#495057',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {country}
          </p>
        </div>

        {/* Court System */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div className="section-label">Court System</div>
          <p style={{
            color: '#495057',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            {courtSystem}
          </p>
        </div>

        {/* Authority Framing */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div className="section-label">Authority Framing</div>
          <p style={{
            color: '#495057',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            {authorityFraming}
          </p>
        </div>

        {/* Emergency Guidance */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div className="section-label">Emergency Guidance</div>
          <p style={{
            color: '#495057',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            Emergency guidance is available through local legal resources and authorities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JurisdictionInfoBar;