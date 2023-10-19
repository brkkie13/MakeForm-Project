import styled from 'styled-components';

export const Toolbar = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  background: ${props => props.theme.colors.background};
  padding: 13px 0;
  position: fixed;
  width: 100vw;
  z-index: 90;
`;
