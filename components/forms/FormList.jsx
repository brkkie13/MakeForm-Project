'use client';
import { FormListStyled } from './FormList.styles';
import { LinkIcon, TrashIcon } from '../../\bstyles/Icons';
import { IconButton } from '../ui/Button.styles';

// code
function FormList({ currentPosts, onShow, onRemove }) {
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
          <tr key={data.id} onClick={() => onShow(data.id)}>
            <td>{data.header}</td>
            <td>{new Date(data.creationDate).toLocaleString()}</td>

            <td className="controls">
              <IconButton>
                <LinkIcon />
              </IconButton>
              <IconButton onClick={event => onRemove(event, data.id)}>
                <TrashIcon />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </FormListStyled>
  );
}

export default FormList;
