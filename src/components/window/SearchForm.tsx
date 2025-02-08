import { AnimatePresence } from "framer-motion";
import React, {  Suspense, useState } from "react";
import { useEffect } from "react";
import { getProjectList } from "utils/api";
import { IList } from "utils/interface";
import Tools from "./Tools";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Loading from "webgl/Loading";
import { Form, Item, SearchIcon, SearchPanel } from "style/HomeStyle";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "utils/hooks";


const SearchForm = () => {
    const [value, setValue] = useState<string>('')
    const [isOpen, setOpen] = useState<boolean>(false)
    const [list, setList] = useState<IList[]>([])
    const debouncedValue = useDebounce(value, 300);

    const { isPending, data, error } = useQuery({ queryKey: ['list', debouncedValue], queryFn: getProjectList})
    const isMoible = useMediaQuery({
        query: '(min-width: 681px)'
    })

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
        <Form>
            <SearchIcon/>
            <input  
                onFocus={onHandleOpen}
                onChange={onChange} 
                onKeyUp={onHandleOpen}
                onBlur={onHandleClose}
                placeholder="ex) 삼성, Cass, 롯데" 
                maxLength={15}
                type="text" 
            />
            <AnimatePresence initial={false}>
                {isOpen && (
                <SearchPanel
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                        open: { height: "auto" },
                        collapsed: { height: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <Suspense fallback={<Loading/>}>
                    {isPending && <Item><p>검색 중...</p></Item>}
                    {list?.length > 0 ? list?.map((item, i)=>{
                        if(i >= 5){
                            return null
                        }else{
                            return(
                                <Item key={i + "key_List"}>
                                    <Link to={`/home/detail/${item.id.replace(/-/g, '')}`}>
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
                </SearchPanel>
                )}
            </AnimatePresence>
        </Form>
    )
}

export default SearchForm;