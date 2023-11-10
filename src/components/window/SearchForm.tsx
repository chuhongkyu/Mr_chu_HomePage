import { AnimatePresence, motion } from "framer-motion";
import React, {  Suspense, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { getProjectList } from "utils/api";
import { IList } from "utils/interface";
import { ITheme } from "utils/theme";
import Tools from "./Tools";
import { useMediaQuery } from "react-responsive";

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
        padding: 1px 42px;
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
    background-image: url('/assets/img/search.png');
    @media ${(props) => props.theme.device.mobile} {
        left: initial;
        right: 10px;
    }
`

const SearchPanel = styled(motion.div)`
    width: 100%;
    height: 40vh;
    padding: 10px 42px;
    background-color:${(props:ITheme) => props.theme.white.lighter};
    @media ${(props) => props.theme.device.mobile} {
        padding: 10px 22px;
    }
`

const Item = styled.div`
    width: 100%;
    font-size: 16px;
    line-height: 125%;
    padding: 1rem 0;
    background-color: ${(props:ITheme) => props.theme.white.lighter};
    a{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    b{
        font-weight: 500;
    }
    p{

    }
`;



const SearchForm = () => {
    const [value, setValue] = useState<any>()
    const [isOpen, setOpen] = useState<boolean>(false)
    const [items, setItems] = useState<IList[]>([])
    const isMoible = useMediaQuery({
        query: '(min-width: 681px)'
    })

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let data = e.target.value;
        setValue(data);
    }

    const onHandleOpen = () =>{
        setOpen(true)
    }

    const onHandleClose = () =>{
        setOpen(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
              const newItems = await getProjectList({ keyword: value });
              if (newItems) {
                setItems(newItems.project);
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
        
          fetchData();
    }, [value]);
    
    return(
        <Form transition={{duration: 0.5, ease:"easeInOut"}}>
            <SearchIcon/>
            <input 
                onFocus={onHandleOpen}
                onChange={onChange} 
                onKeyUp={onHandleOpen}
                onBlur={onHandleClose}
                placeholder="검색을 입력하십시오." 
                maxLength={15}
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
                    <Suspense fallback={null}>
                    {items.length > 0 ? items?.map((item, i)=>{
                        if(i > 5){
                            return
                        }
                        return(
                            <Item key={i + "key_List"}>
                                <a href={item.link && item.link} target="_blank" rel="noreferrer noopener">
                                    <b>{item.projectName.length >= 10 ? item.projectName.substring(0,10) +'...' : item.projectName }
                                        {isMoible ? (
                                        <>
                                            {item.tools.length >= 3 ? item.tools.slice(0,3).map((el, i)=>{
                                                return(
                                                    <Tools key={i + "key badge"} text={el}/>
                                                )
                                            }) : 
                                            item.tools.map((el)=>{
                                                return(
                                                    <Tools key={i + "key badge"} text={el}/>
                                                )
                                            })}
                                        </>)  : null}
                                    </b>
                                    
                                    <p>{item.company}</p>
                                </a>
                            </Item>
                        )
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