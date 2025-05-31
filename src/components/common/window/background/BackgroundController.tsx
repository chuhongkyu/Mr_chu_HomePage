"use client";

import BackgroundLayout from "@/components/common/BackgroundLayout";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function BackgroundController() {
    const isBackground = useSelector((state: RootState) => state.background.isBackground);

    if (!isBackground) return null;

    return (
        <>
            <BackgroundLayout/>
        </>
    )
}

export default BackgroundController