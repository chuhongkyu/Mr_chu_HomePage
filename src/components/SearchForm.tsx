import { motion } from "framer-motion";
import React, {  useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Form = styled(motion.div)`
    margin: 0.5px 10px;
    width: 250px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255,255,255, 0.85);
    padding-left: 20px;
    margin-left: 20px;
    position: relative;
    z-index: 2;
    transform-origin: center bottom;
    input{
        width: 100%;
        height: 100%;
        border: none;
        background-color: transparent;
        &:focus{
            outline: none;
        }
    }
`;

const SearchBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    margin: 2px;
    color: ${(props) => props.theme.black.darker};
    padding: 10px;
    p{
        font-size: 15px;
    }
    @media ${(props) => props.theme.device.mobile} {
    p{
        font-size: 12px;
    }
    }
`;

const SearchForm = () => {
    const [value, setValue] = useState<any>()
    const [open, setOpen] = useState<boolean>(false)
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let data = e.target.value;
        e.preventDefault();
        setValue(data);
        console.log(value);
    }

    const onFocus = () =>{
        setOpen(!open)
        console.log(open)
    }

    useEffect(()=>{

    },[])
    
    return(
        <Form animate={open ? {height: 400} : {height: 37}}>
            {open ? 
                <SearchBox>
                    <p>제작중....</p>      
                </SearchBox> 
            : null
            }
            <input 
                onFocus={onFocus} 
                onChange={onChange} 
                placeholder="검색을 입력하십시오." 
                type="text" />
        </Form>
    )
}

export default SearchForm;