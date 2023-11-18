import styled from "styled-components";
import { ITheme } from "utils/theme";

const Wrapper = styled.div`
    width: 100%;
    background-color: ${(props:ITheme) => props.theme.white.lighter};
    margin-bottom: 0.5rem;
    ul{
        display: flex;
        li{
            padding: 0.1rem 0.6rem 0.18rem;
            border-radius: 25px;
            line-height: 130%;
            font-size: 13px;
            cursor: pointer;
            border: 1px solid ${(props:ITheme) => props.theme.black.cloud};
            background-color:${(props:ITheme) => props.theme.white.lighter};
            &:hover{
                border: 1px solid transparent;
                background-color:${(props:ITheme) => props.theme.blue};
                color: ${(props:ITheme) => props.theme.white.lighter};
            }   
            &:not(:last-of-type){
                margin-right: 0.5rem;
            }
        }
    }
`;


const SearchKeyword = () => {
    return(
        <Wrapper>
            <ul>
                <li>리액트</li>
                <li>NEXT.js</li>
                <li>다국어</li>
            </ul>
        </Wrapper>
    )
}

export default SearchKeyword;