'use client';
import { FormListStyled } from './FormList.styles';

// icons
import { LinkIcon, TrashIcon } from '../../\bstyles/Icons';

// code
function FormList({ currentPosts, showDetailHandler, removeFormHandler }) {
  return (
    <FormListStyled>
      <thead>
        <tr>
          <th>제목</th>
          <th>생성 날짜</th>
        </tr>
      </thead>
      <tbody>
        {currentPosts.map(data => (
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
    </FormListStyled>
  );
}

export default FormList;
