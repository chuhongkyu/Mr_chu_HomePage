import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai"
import { motion } from "framer-motion";
import styled from "styled-components"
import { useState } from "react";
import { useRecoilState } from "recoil";
import { appList } from "atoms";

const Btn = styled(motion.div)`
    display: block;
    position: absolute;
    z-index: 1;
    background: rgba(0,0,0,0.7);
    right: 0;
    bottom: 0;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    .btn{
        padding: 1rem;
        font-size: 1.8rem;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .x-btn{
        padding: 1rem;
        font-size: 1.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const InputForm = styled.form`
    padding: 1rem 1rem 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    input{
        border: none;
        max-width: 120px;
        font-size: 16px;
        font-weight: 500;
        padding: 10px;
        &:focus{
            outline: none;
        }
    }
`

const AddAppBtn = ()=>{
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
        setPlus(true)
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let el = e.target.value;
        setValue(el)
    }

    return(
        <>
        {plus ?
            <Btn onClick={onClick}>
                <span className="btn"><AiOutlinePlus /></span>
            </Btn>
            : 
            <Btn>
                <InputForm onSubmit={onSubmit}>
                    <input name="제목" type="text" placeholder="폴더명" minLength={1} maxLength={5} onChange={onChange} />
                </InputForm>
                <span className="x-btn"><AiFillCloseCircle onClick={onClick}/></span>
            </Btn>
        }
        </>
    )    
}

export default AddAppBtn