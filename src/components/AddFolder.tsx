import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai"
import { useRecoilState } from "recoil";
import { appList } from "atoms";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
    display: block;
    position: absolute;
    bottom: 60px;
    right: 20px;
    background: rgba(0,0,0,0.7);
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #fff;
    cursor: pointer;
    .btn{
        padding: 20px 25px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .x-btn{
        margin-left: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media ${(props) => props.theme.device.tablet} {
        font-size: 22px;
        left: 20px;
        right: initial;
        .btn{
            padding: 20px 25px;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .x-btn{
            margin-left: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
       
    }
    @media ${(props) => props.theme.device.tablet} {
       
    }
`;

const InputForm = styled.form`
    padding: 20px 25px 20px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    input{
        border: none;
        max-width: 100px;
        font-size: 18px;
        font-weight: 500;
        padding: 10px;
        &:focus{
            outline: none;
        }
    }
`

const AddFolder = () => {
    const [plus , setPlus] = useState(true)
    const [folder, setFolder] = useRecoilState(appList)
    const [value, setValue] = useState("")

    const onClick = () =>{
        setPlus(!plus)
    }
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(folder.length < 8) {
            setFolder([...folder, value])
        }
    }
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let el = e.target.value;
        setValue(el)
    }
    useEffect(()=>{
        console.log(value)
    },[value])
    return(
        <Wrapper >
            {plus ? 
                <span className="btn" onClick={onClick}><AiOutlinePlus /></span> :
                <span className="x-btn"><AiFillCloseCircle style={{marginRight: "10px"}} onClick={onClick}/></span> }
            {plus ? null :  
                <InputForm onSubmit={onSubmit}>
                    <input name="제목" type="text" placeholder="폴더명" minLength={1} maxLength={5} onChange={onChange} />
                </InputForm>}
        </Wrapper>
    )
}

export default AddFolder