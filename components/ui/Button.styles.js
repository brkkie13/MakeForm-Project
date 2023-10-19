import styled from 'styled-components';

export const Button = styled.button`
  padding: 6px 12px;
  /* border: 1px solid #b3b3b3; */
  border: 1px solid #4caf50;
  border-radius: 7px;
  line-height: 1.5;
  color: ${props => (props.primary === 'outline' ? '#fff' : '#4caf50')};
  background-color: ${props =>
    props.primary === 'outline' ? '#4caf50' : '#fff'};
  transition: 0.2s all ease-out;
  &:hover {
    color: ${props => (props.primary !== 'outline' ? '#fff' : '#4caf50')};
    background-color: ${props =>
      props.primary !== 'outline' ? '#4caf50' : '#fff'};
  }
`;
