import React from 'react';

export default function NotFoundPage(): React.ReactElement {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f5f5f5'
        }}>
            <h1 style={{ fontSize: '4rem', margin: '0', color: '#333' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', margin: '1rem 0', color: '#666' }}>Page Not Found</h2>
            <p style={{ fontSize: '1rem', margin: '1rem 0', color: '#888', textAlign: 'center' }}>
                The page you are looking for doesn't exist.
            </p>
            <a 
                href="/" 
                style={{ 
                    fontSize: '1rem', 
                    padding: '0.5rem 1rem', 
                    backgroundColor: '#007acc', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '4px',
                    marginTop: '1rem'
                }}
            >
                Go Home
            </a>
        </div>
    );
}
