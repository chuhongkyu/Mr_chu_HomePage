'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSearchWindow } from '@/store/searchWindowSlice';

const KeyboardShortcuts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                dispatch(toggleSearchWindow());
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [dispatch]);

    return null;
};

export default KeyboardShortcuts; 