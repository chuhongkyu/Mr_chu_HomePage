"use client"

import { AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/utils/hooks";

import { getProjectList } from "@/utils/api";
import styles from "@/style/page.module.scss";
import dynamic from "next/dynamic";
import { IList } from "./SearchType";

const SearchList = dynamic(() => import("./SearchList"), {
  ssr: false,
});

const FormContainer = () => {
    const [value, setValue] = useState<string>('')
    const [isOpen, setOpen] = useState<boolean>(false)
    const [list, setList] = useState<IList[]>([])
    const debouncedValue = useDebounce(value, 300);

    const { isPending, data, error } = useQuery({ queryKey: ['list', debouncedValue], queryFn: getProjectList})

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let value = e.target.value;
        setValue(value);
    }

    const onHandleOpen = () => setOpen(true)

    const onHandleClose = () =>{
        setTimeout(()=>{
            setOpen(false)
        },500)
    }
    
    useEffect(()=>{
        setList(data?.project)
    },[data])
    
    return(
        <form className={styles["form-container"]}>
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
    )
}

export default FormContainer;