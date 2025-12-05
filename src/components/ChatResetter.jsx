import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatResetter = () => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleReset = () => {
        // Clear Retell-related keys
        Object.keys(localStorage).forEach((key) => {
            if (key.toLowerCase().includes('retell')) {
                localStorage.removeItem(key);
            }
        });
        // Reload to force new session
        window.location.reload();
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '100px', // Positioned above the default chat bubble (which is usually ~20px from bottom)
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px'
        }}>
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        style={{
                            background: 'rgba(15, 5, 41, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '8px',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                            width: '200px'
                        }}
                    >
                        <p style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '8px', textAlign: 'center' }}>
                            Start a new chat session?
                        </p>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button
                                onClick={handleReset}
                                style={{
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '4px 12px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '4px 12px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                }}
                            >
                                No
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                    background: 'rgba(3, 0, 20, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '6px 12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                </svg>
                Reset Chat
            </button>
        </div>
    );
};

export default ChatResetter;

