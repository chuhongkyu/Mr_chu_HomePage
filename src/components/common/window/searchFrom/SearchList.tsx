"use client"

import { motion } from "motion/react"
import Loading from "@/components/common/Loading"
import { Suspense } from "react"
import { useMediaQuery } from "react-responsive"
import { useDispatch } from "react-redux"
import { setSearchWindow } from "@/store/searchWindowSlice"

import styles from "@/style/page.module.scss";
import Item from "./Item";
import Link from "next/link";
import Tools from "./Tools";
import { IList } from "./SearchType";

interface IPanelProps{
    list: IList[];
    isPending: boolean;
    error: Error | null;
}

function SearchList({isPending, list, error}:IPanelProps) {
    const isMoible = useMediaQuery({query: '(min-width: 768px)'})
    const dispatch = useDispatch()

    const handleNavigation = () => {
        dispatch(setSearchWindow(false))
    }

    return (
        <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
                open: { height: "auto" },
                collapsed: { height: 0 }
            }}
            transition={{ duration: 0.2 }}
            className={styles["search-list"]}
        >
            <Suspense fallback={<Loading/>}>
                {isPending && <Item><p>검색 중...</p></Item>}
                {list?.length > 0 ? list?.map((item, i)=>{
                    if(i >= 5){
                        return null
                    }else{
                        return(
                            <Item key={i + "key_List"}>
                                <Link href={`/project/${item.id.replace(/-/g, '')}`} onClick={handleNavigation}>
                                    <b>
                                        <p>{item.projectName.length >= 10 ? item.projectName.substring(0,10) +'...' : item.projectName }</p>
                                        {isMoible ? (
                                        <>
                                            {item.tools? <Tools key={"key badge"} text={item.tools[0]}/> : null}
                                        </>)  : null}
                                    </b>
                                    <p>{item.company}</p>
                                </Link>
                            </Item>
                        )
                    }
                })
                : <Item><p>검색결과 없음</p></Item>
                }
            </Suspense>
            {error && <Item><p>서버 점검 중...</p></Item>}
        </motion.div>
    )
}

export default SearchList