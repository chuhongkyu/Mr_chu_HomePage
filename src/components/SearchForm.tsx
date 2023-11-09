import { AnimatePresence, motion } from "framer-motion";
import React, {  useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { ITheme } from "utils/theme";

const Form = styled(motion.div)`
    margin-top: 40rem;
    border-radius: 2.2rem;
    width: max(40vw, 680px);
    background-color:${(props:ITheme) => props.theme.white.lighter};
    height: fit-content;
    position: relative;
    z-index: 2;
    overflow: hidden;
    input{
        width: 100%;
        height: 100%;
        border: none;
        background-color: transparent;
        outline: none;
        font-size: 14px;
        padding: 1px 42px;
        height: 40px;
        &:focus{
            outline: none;
        }
    }
    @media ${(props) => props.theme.device.mobile} {
        margin-top: 20rem;
        width: 100%;
    }
`;

const SearchPanel = styled(motion.div)`
    width: 100%;
    height: 40vh;
    padding: 10px 42px;
    background-color:${(props:ITheme) => props.theme.white.lighter};

`

const SearchBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    margin: 2px;
    color: ${(props) => props.theme.black.darker};
    padding: 10px;
    @media ${(props) => props.theme.device.mobile} {

    }
`;

const SearchForm = () => {
    const [value, setValue] = useState<any>()
    const [isOpen, setOpen] = useState<boolean>(false)
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let data = e.target.value;
        e.preventDefault();
        setValue(data);
    }

    const onHandleOpen = () =>{
        setOpen(true)
    }

    const onHandleClose = () =>{
        setOpen(false)
    }

    useEffect(()=>{

    },[])
    
    return(
        <Form transition={{duration: 0.5, ease:"easeInOut"}}>
            <input 
                onFocus={onHandleOpen}
                onChange={onChange} 
                onKeyUp={onHandleOpen}
                onBlur={onHandleClose}
                placeholder="검색을 입력하십시오." 
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
                    transition={{ duration: 0 }}
                >

                </SearchPanel>
                )}
            </AnimatePresence>
        </Form>
    )
}

export default SearchForm;