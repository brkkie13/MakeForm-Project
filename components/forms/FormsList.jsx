'use client';
import { useCallback, useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../../app/forms/loading';
import Link from 'next/link';

// css
import { Label } from './FormsList.styles';
import { Table } from './FormsList.styles';

// components
import LinkIcon from '../icons/LinkIcon';
import TrashIcon from '../icons/TrashIcon';
import SearchIcon from '../icons/SearchIcon';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { removeFormData } from '../../redux/actions';
import { fetchFormData } from '../../redux/actions';

// code
function FormsList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formList = useSelector(state => state.form.formList);
  const [filteredFormList, setFilteredFormList] = useState([]);

  //
  useEffect(() => {
    dispatch(fetchFormData());
  }, []);

  useEffect(() => {
    setFilteredFormList(formList); // 새로고침해도 전체 리스트가 뜨도록.
  }, [formList]);

  const onChange = useCallback(
    event => {
      const searchWord = event.target.value;
      const filteredList = formList.filter(form =>
        form.header.toLowerCase().includes(searchWord.toLowerCase())
      );
      setFilteredFormList(searchWord === '' ? formList : filteredList);
    },
    [formList, setFilteredFormList]
  );

  const showDetailHandler = useCallback(dataId => {
    router.push('/forms/' + dataId);
  }, []);

  const removeFormHandler = useCallback((event, formId) => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(removeFormData(formId));
      router.push('/forms');

      // 삭제버튼의 상위태그 tr의 onClick함수가 실행되는 이벤트버블링을 막음.
      event.stopPropagation();

      // redux에서 가져온 formList 요소가 삭제되면, 바로 fetchFormData를 호출해 삭제가 반영된 새 formList를 가져옴.
      setTimeout(() => {
        dispatch(fetchFormData());
      }, 0);
    } else {
      // confirm창의 취소버튼을 눌렀을 때도 이벤트버블링을 막아 현재페이지에 머물기.
      event.stopPropagation();
    }
  }, []);

  return (
    <>
      <Label>
        <SearchIcon />
        <input type="text" placeholder="제목으로 검색" onChange={onChange} />
      </Label>
      <Table>
        <thead>
          <tr>
            <th>제목</th>
            <th>생성 날짜</th>
          </tr>
        </thead>
        <tbody>
          {filteredFormList.map(data => (
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
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default FormsList;
