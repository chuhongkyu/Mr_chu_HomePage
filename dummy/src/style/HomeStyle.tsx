import styled from "styled-components";
import { motion } from "framer-motion";

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