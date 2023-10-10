import { useEffect, useRef, useState } from 'react';

export const useModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleESCKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleESCKeyDown);
        };
    }, [isOpen]);

    const toggleModal = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        const current = modalRef.current;

        if (isOpen && current && !current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleESCKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    return { isOpen, modalRef, toggleModal, openModal, closeModal };
};
