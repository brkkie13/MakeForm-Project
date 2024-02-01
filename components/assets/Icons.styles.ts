import styled from 'styled-components';
import { SvgProps } from '@/types/types';

export const RemoveBadgeStyled = styled.span<SvgProps>`
  background: ${props => props.theme.colorRed};
  width: 18px;
  height: 18px;
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: -5px;
  top: -5px;

  cursor: pointer;

  svg {
    fill: ${props => props.theme.colorBackground0};
  }
`;

export const LoadingSpinnerStyled = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-spinner {
    width: 35px;
    height: 35px;
    border: 5px solid ${props => props.theme.colorGrayLightest};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
