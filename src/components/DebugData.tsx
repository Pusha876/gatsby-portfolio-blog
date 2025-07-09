/**
 * This is a debugging component to help identify GraphQL data issues
 * Add this temporarily to any page to see what data is being returned
 */
import React from 'react';
import { useSiteConfiguration } from '../hooks/useSiteConfiguration';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

export function DebugData(): React.ReactElement {
    const siteConfig = useSiteConfiguration();
    const siteMetadata = useSiteMetadata();
    
    console.log('🐛 Debug Site Config:', siteConfig);
    console.log('🐛 Debug Site Metadata:', siteMetadata);
    
    return (
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            right: 0, 
            background: 'red', 
            color: 'white', 
            padding: '10px',
            zIndex: 9999,
            fontSize: '12px',
            maxWidth: '300px',
            overflow: 'auto'
        }}>
            <h4>Debug Data</h4>
            <pre>{JSON.stringify({ siteConfig, siteMetadata }, null, 2)}</pre>
        </div>
    );
}
