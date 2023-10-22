'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// css
import { Table } from './FormsList.styles';

// components
import LinkIcon from '../icons/LinkIcon';
import TrashIcon from '../icons/TrashIcon';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData, removeFormData } from '../../redux/actions';

// code
function FormsList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formList = useSelector(state => state.form.formList);

  // useEffect로 CSR (user의 개인적인 데이터이기 때문)
  // 두번 실행되는 문제 해결(next.config.js에 `reactStrictMode: false` 설정)
  useEffect(() => {
    dispatch(fetchFormData());
  }, [dispatch]);

  console.log('forms페이지 formList =>', formList);

  const showDetailHandler = useCallback(dataId => {
    router.push('/forms/' + dataId);
  }, []);

  const removeFormHandler = useCallback(
    (event, formId) => {
      if (window.confirm('삭제하시겠습니까?')) {
        dispatch(removeFormData(formId));
        router.replace('/forms');
        // 삭제버튼의 상위태그 tr의 onClick함수가 실행되는 이벤트버블링을 막음.
        event.stopPropagation();
      } else {
        // confirm창의 취소버튼을 눌렀을 때도 이벤트버블링을 막아 현재페이지에 머물기.
        event.stopPropagation();
      }
    },
    [formList]
  );

  return (
    <Table>
      <thead>
        <tr>
          <th>제목</th>
          <th>생성 날짜</th>
        </tr>
      </thead>
      <tbody>
        {formList.map(data => (
          // <Link href={`/forms/${data.id}`}>
          <tr key={data.id} onClick={() => showDetailHandler(data.id)}>
            <td>{data.header}</td>
            <td>{new Date(data.creationDate).toLocaleString()}</td>
            <td className="controls">
              <span>
                <LinkIcon />
              </span>
              <span onClick={event => removeFormHandler(event, data.id)}>
                <TrashIcon />
              </span>
            </td>
          </tr>
          // </Link>
        ))}
      </tbody>
    </Table>
  );
}

export default FormsList;
