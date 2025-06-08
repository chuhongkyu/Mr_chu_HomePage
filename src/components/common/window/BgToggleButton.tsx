"use client";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleBackground } from '@/store/backgroundSlice';
import styles from "@/style/page.module.scss";

const BgToggleButton = () => {
    const dispatch = useDispatch();
    const isBackground = useSelector((state: RootState) => state.background.isBackground);

    const handleToggle = () => {    
        dispatch(toggleBackground());
    };

    return (
        <div className={styles["bg-toggle-container"]}>
            <input 
                type="checkbox" 
                id="toggle" 
                className={styles["toggle-checkbox"]} 
                checked={isBackground}
                onChange={handleToggle}
            />
            <label htmlFor="toggle" className={styles["bg-toggle-button"]}>
                <div>OFF</div> 
                <div>ON</div>
            </label>
        </div>
    )
}

export default BgToggleButton;