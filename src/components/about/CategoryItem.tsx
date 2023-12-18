import styled from "styled-components";

interface Category {
    isActive: boolean;
}

export const CaegoryItems = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
`

export const CategoryItem = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${({ isActive }:Category) => (isActive ? 'bold' : 'normal')};
  color: ${({ isActive }:Category) => (isActive ? 'black' : 'white')};
`;