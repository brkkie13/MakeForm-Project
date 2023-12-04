import styled from 'styled-components';

export const UserProfileStyled = styled.div`
  display: flex;
  align-items: center;

  .user-info {
    display: flex;
    align-items: center;
    position: relative; // DropdownMenu 컴포넌트와 관련있음.
    cursor: pointer;
    background: transparent;
    padding: 8px 14px;
    border-radius: 5px;

    img {
      border-radius: 50%;
      margin-right: 8px;
    }
  }

  .user-info:hover {
    background: ${props => props.theme.colors.hoverMenu};
  }
  .user-info.active {
    background: ${props => props.theme.colors.activeMenu};
  }

  .controls {
    display: none;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    background-color: ${props => props.theme.colors.background};
    border-radius: 20px;
    padding: 50px 0;

    .user-info {
      flex-direction: column;
      cursor: default;

      img {
        width: 60px;
        height: 60px;
        margin: 0;
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
      display: block;
      gap: 10px;
      margin-top: 50px;
    }
  }
`;
