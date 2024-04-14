import styled from "styled-components";

export const CategoryItems = styled.ul`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  .list{
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    color: #f8f8f8;
    transition: 300ms ease-in-out;
    &.active{
      font-weight: 700;
      color: black;
      transition: 300ms ease-in-out;
    }
  }
  @media screen and (max-width: 940px) {
    .list{
      font-size: 14px;
      font-weight: 700;
    }
  }
`

interface IProps {
  onClick: (e:React.MouseEvent<HTMLElement>)=> void;
  id: string;
  isActive: boolean;
  text: string
}

export const CategoryItem = (props:IProps) => {
  const { onClick, id, isActive, text } = props
  return(
    <li onClick={onClick} id={id} className={`list ${isActive ? "active" : null}`}>{text}</li>
  )
}
