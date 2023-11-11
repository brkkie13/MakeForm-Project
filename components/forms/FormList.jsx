'use client';
import { FormListStyled } from './FormList.styles';
import { LinkIcon, CopyIcon } from '../../\bstyles/Icons';
import { IconButtonStyled } from '../ui/Button.styles';
import Tooltip from '../ui/Tooltip';

// code
function FormList({ currentPosts, onShow, onCopy }) {
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
              <Tooltip text="링크 복사">
                <IconButtonStyled>
                  <LinkIcon />
                </IconButtonStyled>
              </Tooltip>

              <Tooltip text="폼 복제">
                <IconButtonStyled onClick={event => onCopy(event, data.id)}>
                  <CopyIcon />
                </IconButtonStyled>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </FormListStyled>
  );
}

export default FormList;
