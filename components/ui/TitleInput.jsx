'use client';
import styled from 'styled-components';

const StyledTitleInput = styled.input`
  border-bottom: 3px solid #535fca;
  width: 98%;
  margin-bottom: 20px;
  font-size: 20px;
  padding: 5px;
`;

function TitleInput(props) {
  return <StyledTitleInput {...props} placeholder="제목없는 질문" />;
}

export default TitleInput;
