'use client';
// import axios from 'axios';
import { useState, useEffect } from 'react';
import { DetailStyled, FormItemStyled } from '@components/ui/Detail.styles';
import Tooltip from '@components/ui/Tooltip';
import StarRating from '@components/ui/StarRating';
import ObjectiveTypeOption from '@components/form-types/ObjectiveTypeOption';
import { ObjectiveTypeOptionsWrapper } from '@components/form-types/ObjectiveTypeOption.styles';
import {
  LinkIcon,
  EditIcon,
  TrashIcon,
  CorrectIcon,
} from '@components/assets/Icons';
import { FilledButtonStyled, IconButtonStyled } from '@components/ui/Buttons';
import NotificationBanner from '@components/ui/NotificationBanner';
import { ResponseInput } from '@components/ui/FormInputs';
import { FORM_TYPES } from '@utils/constants';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { responsesActions } from '@stores/features/responsesSlice';
import { sendFormResponse } from '@stores/actions/formResponseActionCreators';
import { copyToClipboard } from '@stores/actions/utilsActionCreators';

// code
// formDetail: (관리자) '/forms/[formId]'페이지. 폼 미리보기 디테일.
// sharedForm: '/[formId]'페이지. 유저가 실제로 작성하는 폼 디테일.
// responseDetail: (관리자) '/analysis/[responsesId]'페이지. 유저가 응답한 내용 미리보기 디테일.
function Detail({ formDetail, onEdit, onRemove, sharedForm, responseDetail }) {
  const dispatch = useDispatch();
  const responses = useSelector(state => state.responses.responses);

  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (formDetail) {
      setForm(formDetail);
      dispatch(responsesActions.setInitialValue(form.items));
    } else if (sharedForm) {
      setForm(sharedForm);
      dispatch(responsesActions.setInitialValue(sharedForm.items));
    } else if (responseDetail) {
      setForm(responseDetail);
    }
  }, [formDetail, sharedForm, responseDetail, dispatch]);

  const copyShareLinkHandler = () => {
    dispatch(
      copyToClipboard(
        process.env.NEXT_PUBLIC_DOMAIN + form.id,
        '폼 링크가 복사되었습니다.'
      )
    );
  };

  const changeInputValueHandler = (itemIdx, event) => {
    const newValue = event.target.value;
    dispatch(responsesActions.changeInputValue({ itemIdx, newValue }));
  };

  const changeRatingHandler = (itemIdx, score) => {
    dispatch(responsesActions.changeRatingValue({ itemIdx, score }));
  };

  const changeOptionHandler = (itemIdx, optionIdx, optionText) => {
    // 선택한 객관식 옵션의 인덱스번호와 옵션텍스트를 함수에 전달
    dispatch(
      responsesActions.changeOptionValue({ itemIdx, optionIdx, optionText })
    );
  };

  const submitFormHandler = async event => {
    event.preventDefault();

    const data = {
      formId: form.id,
      header: form.header,
      submissionDate: new Date().toISOString(),
      responses,
      userId: form.userId,
    };

    try {
      await dispatch(sendFormResponse(data));
      setSuccess(true);
    } catch (error) {
      // console.log(error);
    }
  };

  if (success) {
    return (
      <NotificationBanner
        icon={<CorrectIcon />}
        mainText={'작성한 폼이 제출되었습니다.'}
        subText={'감사합니다.'}
      />
    );
  }

  return (
    <DetailStyled>
      <div className="controls">
        {(formDetail || sharedForm) && (
          <Tooltip text="공유">
            <IconButtonStyled onClick={copyShareLinkHandler}>
              <LinkIcon />
              {/* 너비가 모바일일 때만 span 노출(IconButtonStyled에서 설정함) */}
              <span>공유</span>
            </IconButtonStyled>
          </Tooltip>
        )}

        {formDetail && (
          <Tooltip text="편집">
            <IconButtonStyled onClick={onEdit}>
              <EditIcon />
              <span>편집</span>
            </IconButtonStyled>
          </Tooltip>
        )}

        {(formDetail || responseDetail) && (
          <Tooltip text="삭제">
            <IconButtonStyled onClick={onRemove}>
              <TrashIcon />
              <span>삭제</span>
            </IconButtonStyled>
          </Tooltip>
        )}
      </div>

      <div>
        <h1>{form.header}</h1>

        {/* formDetail('/forms/[formId]'), sharedForm('/[formId]')에서만 렌더링 */}
        {form.items?.map((item, itemIdx) => (
          <FormItemStyled key={item.id}>
            <h2 className="title">{item.title}</h2>
            {item.formType === 'subjectiveType' ? (
              sharedForm ? (
                <ResponseInput
                  placeholder="답변을 입력하세요"
                  name="subjectiveType"
                  onChange={event => changeInputValueHandler(itemIdx, event)}
                />
              ) : (
                <p className="placeholder-text">주관식 답변이 입력됩니다</p>
              )
            ) : item.formType === 'ratingType' ? (
              <StarRating
                onChangeRating={newScore =>
                  changeRatingHandler(itemIdx, newScore)
                }
              />
            ) : item.formType === 'objectiveType' ? (
              <ObjectiveTypeOptionsWrapper>
                {item.options?.map((option, optionIdx) =>
                  sharedForm ? (
                    <ObjectiveTypeOption
                      key={option.id}
                      optionIndex={optionIdx}
                      optionText={option.text}
                      checkable={true}
                      onChangeOption={() =>
                        changeOptionHandler(itemIdx, optionIdx, option.text)
                      }
                      name={`radio-group-${itemIdx}`}
                    />
                  ) : (
                    <ObjectiveTypeOption
                      key={option.id}
                      optionText={option.text}
                    />
                  )
                )}
              </ObjectiveTypeOptionsWrapper>
            ) : null}
            <p>{item.description}</p>
          </FormItemStyled>
        ))}

        {/* responseDetail('/analysis/[responsesId]')에서만 렌더링 */}
        {form.responses?.map((item, itemIdx) => (
          <FormItemStyled key={itemIdx}>
            <h2 className="title">{item.title}</h2>

            <div className="response-detail">
              {item.formType !== 'descriptionType' && (
                <span className="form-type">{FORM_TYPES[item.formType]}</span>
              )}
              <p className="response">{item.response}</p>
              <p>{item.description}</p>
            </div>
          </FormItemStyled>
        ))}
      </div>

      {sharedForm && (
        <div className="submit-button">
          <FilledButtonStyled onClick={submitFormHandler}>
            제출하기
          </FilledButtonStyled>
        </div>
      )}
    </DetailStyled>
  );
}

export default Detail;
