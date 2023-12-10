import styled from 'styled-components';

export const ToolbarStyled = styled.nav`
  /* position: fixed;
z-index: 90;
top: 120px;
left: 50%; // 가운데정렬
transform: translateX(-50%); // 가운데정렬 */

  /* background: ${props => props.theme.colors.background};
border-radius: 30px;
border: 1px solid ${props => props.theme.colors.pointSkyblue};
box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); */

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;

  button {
    border: 1px solid ${props => props.theme.colors.pointSkyblue};
    color: ${props => props.theme.colors.pointSkyblue};
    background: ${props => props.theme.colors.background};
    padding: 6px 15px;
    border-radius: 20px;
    white-space: nowrap; // 글자 세로로 나열되는 것을 방지
  }

  button:hover {
    background: ${props => props.theme.colors.pointSkyblue};
    color: white;
  }
`;
