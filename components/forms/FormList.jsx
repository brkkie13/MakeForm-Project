'use client';
import Link from 'next/link';
import {
  FormListStyled,
  EmptyListStyled,
} from '@components/forms/FormList.styles';
import {
  LinkIcon,
  CopyIcon,
  EmptyIcon,
  CreateIcon,
} from '@components/assets/Icons';
import { IconButtonStyled } from '@components/ui/Buttons';
import Tooltip from '@components/ui/Tooltip';
import { formatDate } from '@utils/date';

// code
function FormList({ allPosts, filteredPosts, currentPosts, onShow, onCopy }) {
  if (!allPosts || allPosts.length === 0) {
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
      <table>
        <thead>
          <tr>
            <td>
              총 <span className="number">{filteredPosts.length}</span>건
            </td>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(data => (
            <tr key={data.id} onClick={() => onShow(data.id)}>
              <td>
                <div className="header">{data.header}</div>
                <div className="date-and-controls">
                  <div className="date">{formatDate(data.creationDate)}</div>
                  <div className="controls">
                    <Tooltip text="공유">
                      <IconButtonStyled>
                        <LinkIcon />
                        {/* 너비가 모바일일 때만 span 노출(IconButtonStyled에서 설정함) */}
                        <span>공유</span>
                      </IconButtonStyled>
                    </Tooltip>

                    <Tooltip text="복제">
                      <IconButtonStyled
                        onClick={event => onCopy(event, data.id)}
                      >
                        <CopyIcon />
                        <span>복제</span>
                      </IconButtonStyled>
                    </Tooltip>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </FormListStyled>
  );
}

export default FormList;
