import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function useModal() {
    return useContext(ModalContext);
}

export function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [heroFormRef, setHeroFormRef] = useState(null);
    const [pageKey, setPageKey] = useState(0);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const refreshPage = () => {
        setPageKey(prev => prev + 1);
    };

    const scrollToHero = () => {
        closeModal();
        if (heroFormRef) {
            heroFormRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Trigger highlight effect
            heroFormRef.classList.add('highlight-form');
            setTimeout(() => {
                heroFormRef.classList.remove('highlight-form');
            }, 2000);
        } else {
            // Fallback if ref isn't set, just scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const registerHeroForm = (ref) => {
        if (ref && ref.current) {
            setHeroFormRef(ref.current);
        }
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, scrollToHero, registerHeroForm, pageKey, refreshPage }}>
            {children}
        </ModalContext.Provider>
    );
}
