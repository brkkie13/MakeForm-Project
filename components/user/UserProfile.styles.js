import styled from 'styled-components';

export const UserProfileStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-top: 50px;
  }
`;
