import { useRouter } from 'next/navigation';
import {
  ResponsesListStyled,
  TableWrapper,
} from '@components/responses/ResponsesList.styles';
import NotificationBanner from '@components/ui/NotificationBanner';
import { EmptyIcon } from '@components/assets/Icons';
import { formatDateToLocaleString } from '@utils/date';

const FORM_TYPE = {
  'shortAnswerType': '단답형',
  'longAnswerType': '장문형',
  'multipleChoiceTextType': '객관식(텍스트형)',
  'multipleChoiceImageType': '객관식(이미지형)',
  'ratingType': '평점',
};

function ResponsesList({ responsesList }) {
  const router = useRouter();

  const showDetailPageHandler = dataId => {
    router.push('/analysis/' + dataId);
  };

  if (!responsesList || responsesList.length === 0) {
    return (
      <NotificationBanner
        icon={<EmptyIcon />}
        mainText={'응답이 존재하지 않습니다.'}
      />
    );
  }
  // responsesList의 각 요소의 responses배열 중 가장 긴 길이를 반환
  const maxLength = responsesList.reduce((max, data) => {
    const validResponsesLength = data.responses.filter(
      item => item.title && item.response
    ).length; // responses 배열에서 질문으로만 이루어진 것들의 배열 길이를 반환

    return Math.max(max, validResponsesLength);
  }, 0);

  return (
    <ResponsesListStyled>
      <nav>
        <div className="total-count">
          총 <span className="number">{responsesList.length}</span>건
        </div>
      </nav>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <td>응답 번호</td>
              <td>응답 날짜</td>
              <td>폼 이름</td>
              {Array.from({ length: maxLength }).map((_, index) => (
                <td key={index}>질문 {index + 1}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {responsesList.map(data => (
              <tr
                key={data.submissionDate}
                onClick={() => showDetailPageHandler(data.submissionDate)}
              >
                <td className="responses-id">{data.submissionDate}</td>
                <td className="date">
                  {formatDateToLocaleString(data.submissionDate)}
                </td>
                <td className="header">{data.header}</td>
                {data.responses.map(
                  (item, idx) =>
                    item.title &&
                    item.response && (
                      <td key={idx}>
                        <div className="response-data">
                          <span className="form-type">
                            {FORM_TYPE[item.formType]}
                          </span>
                          <span className="title-text">{item.title}</span>
                          <span className="response">답변</span>
                          <span className="response-text">{item.response}</span>
                        </div>
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </ResponsesListStyled>
  );
}

export default ResponsesList;
