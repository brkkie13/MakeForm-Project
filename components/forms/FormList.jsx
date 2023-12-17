'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormListStyled, EmptyListStyled } from './FormList.styles';
import {
  LinkIcon,
  CopyIcon,
  EmptyIcon,
  CreateIcon,
} from '../../\bstyles/Icons';
import { IconButtonStyled } from '../ui/Button.styles';
import Tooltip from '../ui/Tooltip';
import { formatDate } from '../../utils/date';

// code
function FormList({ allPosts, currentPosts, onShow, onCopy }) {
  const router = useRouter();

  if (currentPosts.length === 0) {
    return (
      <EmptyListStyled>
        <EmptyIcon />
        <p className="main-text">게시물이 존재하지 않습니다.</p>
        <div className="sub-text">
          <Link href={'/create'} className="create-form-button">
            <CreateIcon />폼 만들기
          </Link>
          <p>에서 새로운 폼을 추가하세요!</p>
        </div>
      </EmptyListStyled>
    );
  }

  return (
    <FormListStyled>
      <thead>
        <tr>
          <td>
            총 <span className="number">{allPosts.length}</span>건
          </td>
        </tr>
      </thead>
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
