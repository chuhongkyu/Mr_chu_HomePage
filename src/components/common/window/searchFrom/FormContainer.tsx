"use client"

import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/utils/hooks";

import { getProjectList } from "@/utils/api";
import styles from "@/style/page.module.scss";

import { IList, ProjectListResponse } from "./SearchType";
import SearchList from "./SearchList";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from '@/store/store';
import { setSearchWindow } from "@/store/searchWindowSlice";
import type { QueryFunctionContext } from "@tanstack/react-query";

const FormContainer = () => {
    const isSearchWindowVisible = useSelector((state: RootState) => state.searchWindow.isSearchWindowVisible);
    const dispatch = useDispatch()

    const [value, setValue] = useState<string>('')
    const [isOpen, setOpen] = useState<boolean>(false)
    const [list, setList] = useState<IList[]>([])
    const debouncedValue = useDebounce(value, 300);
    const [isMounted, setIsMounted] = useState(false);

    const { data, isPending, error } = useQuery<ProjectListResponse | null>({
        queryKey: ['list', debouncedValue],
        queryFn: getProjectList,
    });

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let value = e.target.value;
        value = value.replace(/[^가-힣a-zA-Z0-9\s]/g, '');
        setValue(value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const onHandleOpen = () => setOpen(true)

    const onHandleClose = () =>{
        setTimeout(()=>{
            setOpen(false)
        },500)
    }
    
    useEffect(()=>{
        if(data){
            setList(data?.project)
        }
    },[data])

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const onHandeleDimClose = () => {
        dispatch(setSearchWindow(false))
    }
    
    return(
        <AnimatePresence mode="wait" initial={false}>
            {isSearchWindowVisible && (
                <motion.section
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1,}}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    exit={{ opacity: 0,}}
                    className={styles["form-section"]}>
                    <form className={styles["form-container"]} onSubmit={handleSubmit}>
                        <span className={styles["form-icon"]}/>
                        <input  
                            onFocus={onHandleOpen}
                            onChange={onChange} 
                            onKeyUp={onHandleOpen}
                            onBlur={onHandleClose}
                            placeholder="ex) 삼성, Cass, 롯데" 
                            maxLength={15}
                            type="text" 
                        />
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen && (
                                <SearchList isPending={isPending} list={list} error={error}/>
                            )}
                        </AnimatePresence>
                    </form>
                    <div className={styles["form-container-dim"]} onClick={onHandeleDimClose}/>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default FormContainer;