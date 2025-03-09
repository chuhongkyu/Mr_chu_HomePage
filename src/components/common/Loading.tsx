import styled, { keyframes } from "styled-components";

const rotation = keyframes`
  0%{
    transform: rotate(-40deg);
  }
  100%{
    transform: rotate(320deg);
  }
`

const Load = styled.div`
    display: inline-block;
    position: relative;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    border-radius: 50%;
    & div{
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 35px;
        height: 35px;
        margin: 8px;
        border-radius: 50%;
        animation: ${rotation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border: 3px solid rgb(76, 77, 77);
        border-color:rgb(76, 77, 77)  transparent transparent transparent;
    }
    & div:nth-child(1) {
        animation-delay: -0.45s;
    }
    & div:nth-child(2) {
        animation-delay: -0.3s;
    }
    & div:nth-child(3) {
        animation-delay: -0.15s;
    }
`

const Loading = () =>{
    return(
        <Load>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </Load>
    )
}

export default Loading