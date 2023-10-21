import styled from 'styled-components';

export const Toolbar = styled.nav`
  margin: 0 auto;
  margin-top: 20px;
  background: ${props => props.theme.colors.background};
  border-radius: 30px;
  border: 1px solid ${props => props.theme.colors.pointSkyblue};
  width: 750px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: fixed;
  z-index: 90;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);

  button {
    padding: 6px 15px;
    border-radius: 20px;
    transition: 0.2s ease-in-out;
  }

  button:hover {
    background: ${props => props.theme.colors.pointSkyblue};
    color: white;
  }
`;
