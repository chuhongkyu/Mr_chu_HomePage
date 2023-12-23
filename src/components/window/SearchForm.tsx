import { AnimatePresence, motion } from "framer-motion";
import React, {  Suspense, useCallback, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { getProjectList } from "utils/api";
import { IList } from "utils/interface";
import { ITheme } from "utils/theme";
import Tools from "./Tools";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import { typing } from "atoms";
import { Link } from "react-router-dom";
import Loading from "webgl/Loading";
import { useDebounce } from "utils/hooks";

const Form = styled(motion.div)`
    margin-top: 20rem;
    border-radius: 24px;
    width: max(40vw, 680px);
    background-color:${(props:ITheme) => props.theme.white.lighter};
    height: fit-content;
    position: relative;
    z-index: 3;
    overflow: hidden;
    box-shadow: ${(props:ITheme) => props.theme.shadow};
    input{
        width: 100%;
        height: 100%;
        border: none;
        background-color: transparent;
        outline: none;
        font-size: 16px;
        padding: 1px 42px 1px 47px ;
        height: 42px;
        &:focus{
            outline: none;
        }
    }
    @media ${(props) => props.theme.device.mobile} {
        margin-top: 23rem;
        width: 100%;
        input{
            padding: 1px 22px;
        }
    }
`;

const SearchIcon = styled(motion.span)`
    width: 18px;
    height: 18px;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    left: 18px;
    top: 11px;
    background-image: url('/assets/img/notion.png');
    @media ${(props) => props.theme.device.mobile} {
        left: initial;
        right: 10px;
    }
`

const SearchPanel = styled(motion.div)`
    width: 100%;
    height: 40vh;
    padding: 10px 0;
    background-color:${(props:ITheme) => props.theme.white.lighter};
    @media ${(props) => props.theme.device.mobile} {
        padding: 10px 0;
    }
`

const Item = styled.div`
    width: 100%;
    font-size: 16px;
    line-height: 125%;
    padding: 0.8rem 42px;
    background-color: ${(props:ITheme) => props.theme.white.lighter};
    a{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    b{
        display: flex;
        p{
            font-weight: 500;
            padding-right: 1rem;
        }
    }
    p{

    }
    &:hover{
        background-color: ${(props:ITheme) => props.theme.white.darker};
    }
    @media ${(props) => props.theme.device.mobile} {
        padding: 0.8rem 22px;
    }
`;


const SearchForm = () => {
    const [value, setValue] = useState<string>('')
    const [isOpen, setOpen] = useState<boolean>(false)
    const [items, setItems] = useState<IList[]>([])
    const [typingValue, setTyping] = useRecoilState(typing);
    const debouncedSearchText = useDebounce(value, 500);

    const isMoible = useMediaQuery({
        query: '(min-width: 681px)'
    })

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let data = e.target.value;
        setValue(data);
    }

    const onKeyDown = () => {
        setTyping(!typingValue)
    }

    const onHandleOpen = () =>{
        setOpen(true)
    }

    const onHandleClose = () =>{
        setTimeout(()=>{
            setOpen(false)
        },500)
    }

    const fetchData = useCallback(async () => {
        try {
            const newItems = await getProjectList({ keyword: debouncedSearchText });
            if (newItems) {
                setItems(newItems.project);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [debouncedSearchText, setItems]);
    

    useEffect(() => {
        if(debouncedSearchText.length > 0){
            fetchData();
        }
    }, [debouncedSearchText, fetchData]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData();
    }

    useEffect(()=>{
        fetchData();
    },[fetchData])
    
    return(
        <Form transition={{duration: 0.5, ease:"easeInOut"}} onSubmit={onSubmit}>
            <SearchIcon/>
            <input 
                onFocus={onHandleOpen}
                onChange={onChange} 
                onKeyUp={onHandleOpen}
                onBlur={onHandleClose}
                placeholder="ex) 리액트" 
                maxLength={15}
                onKeyDown={onKeyDown}
                type="text" />
            
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
                    {/* <SearchKeyword/> */}
                    {items.length > 0 ? items?.map((item, i)=>{
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
                    : (
                        <Item>
                            <p>검색결과 없음</p>
                        </Item>
                    )
                    }
                    </Suspense>
                </SearchPanel>
                )}
            </AnimatePresence>
        </Form>
    )
}

export default SearchForm;