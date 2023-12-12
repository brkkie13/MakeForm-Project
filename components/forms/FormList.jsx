'use client';
import { FormListStyled } from './FormList.styles';
import { LinkIcon, CopyIcon } from '../../\bstyles/Icons';
import { IconButtonStyled } from '../ui/Button.styles';
import Tooltip from '../ui/Tooltip';
import { formatDate } from '../../utils/date';

// code
function FormList({ currentPosts, onShow, onCopy }) {
  return (
    <FormListStyled>
      <tbody>
        {currentPosts.map(data => (
          <tr key={data.id} onClick={() => onShow(data.id)}>
            <td>
              <div className="header">{data.header}</div>
              <div className="date-and-controls">
                <span className="date">{formatDate(data.creationDate)}</span>
                <span className="controls">
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
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </FormListStyled>
  );
}

export default FormList;
