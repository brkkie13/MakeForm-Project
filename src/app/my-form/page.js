'use client';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// components
import LinkIcon from '../../../components/icons/link-icon';
import TrashIcon from '../../../components/icons/trash-icon';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData } from '@/redux/actions';

// css
const Section = styled.section`
  margin: 0;
  background: ${props => props.theme.colors.background2};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  h1 {
    font-size: 18px;
    margin: 0;
    width: 80%;
    margin-bottom: 30px;
  }

  table {
    width: 80%;
    border-collapse: collapse; //테두리 겹치기 해제
    border-spacing: 0; // 셀 사이의 간격 없애기
  }

  td:nth-child(1) {
    width: 100px;
  }

  thead tr {
    border-bottom: 1px solid gray;
  }

  thead tr th {
    color: black;
    text-align: left;
    padding: 6px 0;
  }

  tr td:nth-child(1),
  tr th:nth-child(1) {
    width: 40%;
    padding-left: 10px;
  }

  tr td:nth-child(3) {
    padding-right: 10px;
  }

  tbody tr {
    border-bottom: 1px solid lightgray;
  }

  tbody tr td {
    padding: 10px 0;
  }

  tbody tr:hover {
    background-color: ${props => props.theme.colors.background};
    cursor: pointer;
  }

  .controls {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: flex-end;
  }

  .controls span svg {
    width: 18px;
  }

  .controls span {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .controls span:hover {
    background-color: gray;
    color: white;
  }
`;

// code
function MyFormPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formList = useSelector(state => state.myForm.formList);

  // 클라이언트 사이드 렌더링 (user의 개인적인 데이터이기 때문)
  useEffect(() => {
    dispatch(fetchFormData());
  }, [dispatch]);

  const showDetailHandler = dataId => {
    router.push('/my-form/' + dataId);
  };

  const formatDateHandler = creationDate => {
    const year = new Date(creationDate).getFullYear();
    const month = new Date(creationDate).getMonth();
    const date = new Date(creationDate).getDate();
    return `${year}년 ${month}월 ${date}일`;
  };

  return (
    <Section>
      <h1>최근 폼</h1>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>생성 날짜</th>
          </tr>
        </thead>
        <tbody>
          {formList.map(data => (
            <tr key={data.id} onClick={() => showDetailHandler(data.id)}>
              <td>{data.header}</td>
              <td>{formatDateHandler(data.creationDate)}</td>
              <td className="controls">
                <span>
                  <LinkIcon />
                </span>
                <span>
                  <TrashIcon />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

export default MyFormPage;
