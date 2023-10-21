import styled from 'styled-components';

// 기본 본문 textarea
export const Textarea = styled.textarea`
  overflow: hidden;
  /* background-color: #f1fbff; */
  width: 100%;
  height: 20px;
  line-height: 1.3;
  &::placeholder {
    color: #bbbbbb;
  }
`;

// 헤더 textarea
export const HeaderTextarea = styled(Textarea)`
  font-size: 22px;
  height: 26px;
`;

// 제목 textarea
export const TitleTextarea = styled(Textarea)`
  font-size: 19px;
  height: 22px;
  margin-bottom: 15px;
`;
