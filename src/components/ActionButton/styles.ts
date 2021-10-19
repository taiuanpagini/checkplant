import styled from 'styled-components';

type ButtonType = {
  color: string;
  background: string;
  border: string;
  selected?: boolean;
}

export const Container = styled.button<ButtonType>`
  width: 100%;
  height: 35px;
  border: none;
  font-size: 0.8rem;
  background: ${props => props.background};
  color: ${props => props.color};
  border: 1px solid ${props => props.border};
  border-radius: 5px;
  padding: 0 10px;
  text-transform: uppercase;
  transition: filter .2s;
  filter: ${props => props.selected ? 'brightness(.9)' : 'brightness(1)'};
  
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-left: 10px;
  }

  & + button {
    margin-top: 10px;
  }

  &:hover {
    filter: brightness(.9);
  }
`;
