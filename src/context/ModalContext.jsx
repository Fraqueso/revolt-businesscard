import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function useModal() {
    return useContext(ModalContext);
}

export function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [heroFormRef, setHeroFormRef] = useState(null);
    const [pageKey, setPageKey] = useState(0);
    const [shouldScrollToHero, setShouldScrollToHero] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const refreshPage = () => {
        setPageKey(prev => prev + 1);
    };

    const performScrollToHero = (element) => {
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Trigger highlight effect
            element.classList.remove('highlight-form'); // Reset just in case
            // Force reflow
            void element.offsetWidth;
            element.classList.add('highlight-form');
            setTimeout(() => {
                element.classList.remove('highlight-form');
            }, 2000);
        }
    };

    const scrollToHero = () => {
        closeModal();
        if (heroFormRef) {
            performScrollToHero(heroFormRef);
        } else {
            // Fallback if ref isn't set, just scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const registerHeroForm = (ref) => {
        if (ref && ref.current) {
            setHeroFormRef(ref.current);
            
            // Check if we need to scroll to it (coming from another page)
            if (shouldScrollToHero) {
                // Small delay to ensure render is complete and smooth transition
                setTimeout(() => {
                    performScrollToHero(ref.current);
                    setShouldScrollToHero(false);
                }, 500);
            }
        }
    };

    return (
        <ModalContext.Provider value={{ 
            isModalOpen, 
            openModal, 
            closeModal, 
            scrollToHero, 
            registerHeroForm, 
            pageKey, 
            refreshPage,
            setShouldScrollToHero 
        }}>
            {children}
        </ModalContext.Provider>
    );
}
