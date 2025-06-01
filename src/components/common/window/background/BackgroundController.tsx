"use client";

import BackgroundLayout from "@/components/common/BackgroundLayout";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useMediaQuery } from "react-responsive";

function BackgroundController() {
    const isMobile = useMediaQuery({ query: '(max-width: 468px)' });
    const isBackground = useSelector((state: RootState) => state.background.isBackground);

    if (!isBackground) return null;

    return (
        <>
            {!isMobile && <BackgroundLayout/>}
        </>
    )
}

export default BackgroundController