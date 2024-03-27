import styled from "styled-components";
import { motion } from "framer-motion";

export const Form = styled.div`
    margin-top: 20rem;
    border-radius: 24px;
    width: max(40vw, 680px);
    background-color:${(props) => props.theme.white.lighter};
    height: fit-content;
    position: relative;
    z-index: 3;
    overflow: hidden;
    box-shadow: ${(props) => props.theme.shadow};
    input[type="text"]{
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
        margin-top: 15rem;
        width: 100%;
        input[type="text"]{
            padding: 1px 22px;
        }
    }
`;

export const SearchIcon = styled(motion.span)`
    width: 18px;
    height: 18px;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    left: 18px;
    top: 11px;
    background-image: url('/assets/img/notion.webp');
    @media ${(props) => props.theme.device.mobile} {
        left: initial;
        right: 20px;
    }
`

export const SearchPanel = styled(motion.div)`
    width: 100%;
    height: 40vh;
    padding: 10px 0;
    background-color:${(props) => props.theme.white.lighter};
    @media ${(props) => props.theme.device.mobile} {
        padding: 10px 0;
    }
`

export const Item = styled.div`
    width: 100%;
    font-size: 16px;
    line-height: 125%;
    padding: 0.8rem 42px;
    background-color: ${(props) => props.theme.white.lighter};
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
    &:hover{
        background-color: ${(props) => props.theme.white.darker};
    }
    @media ${(props) => props.theme.device.mobile} {
        padding: 0.8rem 22px;
    }
`;

export const Badge = styled(motion.span)`
    padding: 0.1rem 0.6rem 0.18rem;
    border-radius: 25px;
    font-size: 13px;
    line-height: 130%;
    color: ${(props) => props.theme.white.lighter};
    background: ${(props) => props.theme.blue};

    input[type="checkbox"]{
        display: none;
    }
    label{
        cursor: pointer;
    }
    input[type="checkbox"]:checked + label{
    }
`