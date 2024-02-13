'use client';
import Link from 'next/link';
import {
  FormListStyled,
  TableWrapper,
} from '@components/forms/FormList.styles';
import { LinkIcon, CopyIcon, EmptyIcon, CreateIcon } from '@/public/svgs/Icons';
import { IconButtonStyled } from '@components/ui/Buttons';
import Tooltip from '@components/ui/Tooltip';
import { formatDate } from '@utils/date';
import NotificationBanner from '@components/ui/NotificationBanner';

// types
import { CreatedData } from '@/types/types';

type Props = {
  allPosts: CreatedData[];
  filteredPosts: CreatedData[];
  currentPosts: CreatedData[];
  onShowDetail: (dataId: string) => void;
  onCloneForm: (event: React.MouseEvent, formId: string) => void;
  onCopyLink: (event: React.MouseEvent, formId: string) => void;
};

// code
function FormList({
  allPosts,
  filteredPosts,
  currentPosts,
  onShowDetail,
  onCloneForm,
  onCopyLink,
}: Props) {
  if (!allPosts || allPosts.length === 0) {
    return (
      <NotificationBanner
        icon={<EmptyIcon />}
        mainText={'게시물이 존재하지 않습니다.'}
        subText={
          <>
            <Link href={'/create'} className="button">
              <CreateIcon />폼 만들기
            </Link>
            <p>에서 새로운 폼을 추가하세요!</p>
          </>
        }
      />
    );
  }

  return (
    <FormListStyled>
      <nav>
        <div className="total-count">
          총 <span className="number">{filteredPosts.length}</span>건
        </div>
      </nav>
      <TableWrapper>
        <table>
          <tbody>
            {/* data.id가 선택적 프로퍼티라서 임시로 우선 타입가드 설정 (data.id &&) */}
            {currentPosts.map(data => (
              <tr
                key={data.id}
                onClick={() => data.id && onShowDetail(data.id)}
              >
                <td>
                  <div className="header">{data.header}</div>
                  <div className="date-and-controls">
                    <div className="date">{formatDate(data.creationDate)}</div>
                    <div className="controls">
                      <Tooltip text="공유">
                        <IconButtonStyled
                          onClick={event =>
                            data.id && onCopyLink(event, data.id)
                          }
                        >
                          <LinkIcon />
                          {/* 너비가 모바일일 때만 span 노출(IconButtonStyled에서 설정함) */}
                          <span>공유</span>
                        </IconButtonStyled>
                      </Tooltip>

                      <Tooltip text="복제">
                        <IconButtonStyled
                          onClick={event =>
                            data.id && onCloneForm(event, data.id)
                          }
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
      </TableWrapper>
    </FormListStyled>
  );
}

export default FormList;
