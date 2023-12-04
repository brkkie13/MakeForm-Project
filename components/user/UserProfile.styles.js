import styled from 'styled-components';

export const UserProfileStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
  padding: 50px 0;

  .user-info {
    display: flex;
    align-items: center;
    flex-direction: column;

    img {
      border-radius: 50%;
      width: 60px;
      height: 60px;
      margin-bottom: 20px;
    }

    span {
      font-size: 22px;
      font-weight: bold;
    }
  }

  .user-info:hover,
  .user-info:active {
    background: none;
  }

  .controls {
    display: flex;
    gap: 10px;
    margin-top: 50px;
  }
`;
