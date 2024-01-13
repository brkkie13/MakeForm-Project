import { useRouter } from 'next/navigation';
import { CSVLink } from 'react-csv';
import {
  ResponsesListStyled,
  TableWrapper,
} from '@components/responses/ResponsesList.styles';
import NotificationBanner from '@components/ui/NotificationBanner';
import { EmptyIcon, DownloadIcon } from '@components/assets/Icons';
import { ButtonStyled } from '@components/ui/Buttons';
import { formatDateToLocaleString } from '@utils/date';
import { FORM_TYPES } from '@utils/constants';

// code
function ResponsesList({ allPosts, filteredPosts, currentPosts, user }) {
  const router = useRouter();

  const showDetailPageHandler = dataId => {
    router.push('/analysis/' + dataId);
  };

  if (!allPosts || allPosts.length === 0 || !user) {
    return (
      <NotificationBanner
        icon={<EmptyIcon />}
        mainText={'응답이 존재하지 않습니다.'}
      />
    );
  }
  // responsesList의 각 요소의 responses배열 중 가장 긴 길이를 반환
  const maxLength = currentPosts.reduce((max, data) => {
    const validResponsesLength = data.responses.filter(
      item => item.title && item.response
    ).length; // responses 배열에서 질문으로만 이루어진 것들의 배열 길이를 반환

    return Math.max(max, validResponsesLength);
  }, 0);

  // 표 데이터의 thead
  const headers = [
    { label: '응답 ID', key: 'responsesId' },
    { label: '응답 날짜', key: 'responsesDate' },
    { label: '폼 이름', key: 'header' },

    ...Array.from({ length: maxLength }).map((_, index) => ({
      label: `질문 ${index + 1}`,
      key: `question${index + 1}`,
    })),
  ];

  // 표 데이터의 tbody
  const data = currentPosts.map(item => {
    const obj = {
      responsesId: item.id,
      responsesDate: formatDateToLocaleString(item.submissionDate),
      header: item.header,
    };

    item.responses
      .filter(el => el.title && el.response)
      .forEach((el, i) => {
        obj[`question${i + 1}`] = `${FORM_TYPES[el.formType]}: ${
          el.title
        } / 답변: ${el.response}`;
      });

    return obj;
  });

  return (
    <ResponsesListStyled>
      <nav>
        <div className="total-count">
          총 <span className="number">{filteredPosts.length}</span>건
        </div>
        <ButtonStyled>
          <CSVLink
            headers={headers}
            data={data}
            filename={formatDateToLocaleString(new Date())}
            target="_blank"
          >
            <DownloadIcon />
            엑셀 추출
          </CSVLink>
        </ButtonStyled>
      </nav>

      <TableWrapper>
        <table>
          <thead>
            <tr>
              {headers.map(header => (
                <td key={header.key}>{header.label}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr
                key={row.responsesId}
                onClick={() => showDetailPageHandler(row.responsesId)}
              >
                {headers.map(header => (
                  <td
                    key={header.key}
                    className={
                      header.key === 'responsesId' ? 'responses-id' : ''
                    }
                  >
                    {row[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </ResponsesListStyled>
  );
}

export default ResponsesList;
