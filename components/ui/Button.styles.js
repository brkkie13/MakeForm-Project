import styled from 'styled-components';

export const Button = styled.button`
  padding: 6px 12px;
  border-radius: 5px;
  line-height: 1.5;
  transition: 0.2s all ease-out;

  border: 1px solid ${props => props.theme.colors.pointSkyblue};
  border: ${props => props.primary === 'non-outline' && 'none'};

  color: ${props =>
    props.primary === 'highlight' ? '#fff' : props.theme.colors.pointSkyblue};

  background-color: ${props =>
    props.primary === 'highlight' && props.theme.colors.pointSkyblue};

  &:hover {
    background: ${props =>
      props.primary === 'highlight' && props.theme.colors.pointSkyblue2};
    border-color: ${props =>
      props.primary === 'highlight' && props.theme.colors.pointSkyblue2};
  }
`;

export const SmallButton = styled(Button)`
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 30px;
  /* color: white;
  background-color: ${props => props.theme.colors.pointSkyblue}; */
`;
