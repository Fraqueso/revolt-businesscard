import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1 
                        className="text-gradient"
                        style={{ 
                            fontSize: 'min(15vw, 8rem)', 
                            fontWeight: '800', 
                            lineHeight: 1,
                            marginBottom: '1rem'
                        }}
                    >
                        404
                    </motion.h1>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{ 
                            fontSize: 'min(6vw, 2.5rem)', 
                            fontWeight: '700',
                            marginBottom: '1.5rem',
                            color: 'var(--color-text)'
                        }}
                    >
                        Signal Lost
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        style={{ 
                            fontSize: '1.2rem', 
                            color: 'var(--color-text-secondary)',
                            maxWidth: '600px',
                            margin: '0 auto 3rem',
                            lineHeight: 1.6
                        }}
                    >
                        The frequency you are trying to reach is unavailable. It may have been moved, disconnected, or never existed in this dimension.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link to="/" className="btn btn-primary btn-glow-hover">
                            Return to Base
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default NotFound;

