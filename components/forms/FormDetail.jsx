'use client';
// import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  FormDetailStyled,
  FormItemStyled,
} from '@components/forms/FormDetail.styles';
import Tooltip from '@components/ui/Tooltip';
import StarRating from '@components/ui/StarRating';
import {
  LinkIcon,
  EditIcon,
  TrashIcon,
  CorrectIcon,
} from '@components/assets/Icons';
import { InputOptionsStyled } from '@components/ui/InputOptionsStyled';
import { FilledButtonStyled, IconButtonStyled } from '@components/ui/Buttons';
import MultipleChoiceInput from '@components/form-types/MultipleChoiceInput';
import NotificationBanner from '../ui/NotificationBanner';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { responsesActions } from '@stores/features/responsesSlice';
import { sendFormResponse } from '@stores/actions/formResponseActionCreators';

// code
// formDetail: 관리자모드의 폼 미리보기 페이지.
// sharedForm: 유저가 실제로 작성하는 공유된 폼 페이지.
function FormDetail({ formDetail, onEdit, onRemove, sharedForm }) {
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
    }
  }, [formDetail, sharedForm, dispatch]);

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
    <FormDetailStyled>
      <div className="controls">
        <Tooltip text="공유">
          <IconButtonStyled>
            <LinkIcon />
            {/* 너비가 모바일일 때만 span 노출(IconButtonStyled에서 설정함) */}
            <span>공유</span>
          </IconButtonStyled>
        </Tooltip>

        {!sharedForm && (
          <>
            <Tooltip text="편집">
              <IconButtonStyled onClick={onEdit}>
                <EditIcon />
                <span>편집</span>
              </IconButtonStyled>
            </Tooltip>

            <Tooltip text="삭제">
              <IconButtonStyled onClick={onRemove}>
                <TrashIcon />
                <span>삭제</span>
              </IconButtonStyled>
            </Tooltip>
          </>
        )}
      </div>

      <div>
        <h1>{form.header}</h1>

        {form.items?.map((item, itemIdx) => (
          <FormItemStyled key={item.id}>
            <h2 className="title">{item.title && item.title}</h2>

            {item.formType === 'shortAnswerType' ? (
              sharedForm ? (
                <input
                  type="text"
                  placeholder="답변을 입력하세요"
                  name="shortAnswerType"
                  onChange={event => changeInputValueHandler(itemIdx, event)}
                />
              ) : (
                <p className="placeholder-text">단답의 답변이 입력됩니다</p>
              )
            ) : item.formType === 'longAnswerType' ? (
              sharedForm ? (
                <textarea
                  placeholder="답변을 입력하세요"
                  name="longAnswerType"
                  onChange={event => changeInputValueHandler(itemIdx, event)}
                ></textarea>
              ) : (
                <p className="placeholder-text">장문의 답변이 입력됩니다</p>
              )
            ) : item.formType === 'ratingType' ? (
              <StarRating
                onChangeRating={newScore =>
                  changeRatingHandler(itemIdx, newScore)
                }
              />
            ) : null}

            <InputOptionsStyled>
              {item.options &&
                item.options.map((option, optionIdx) =>
                  sharedForm ? (
                    <MultipleChoiceInput
                      key={option.id}
                      optionIndex={optionIdx}
                      optionText={option.text}
                      checkable={true}
                      onChangeOption={() =>
                        changeOptionHandler(itemIdx, optionIdx, option.text)
                      }
                    />
                  ) : (
                    <MultipleChoiceInput
                      key={option.id}
                      optionText={option.text}
                    />
                  )
                )}
            </InputOptionsStyled>

            <div>{item.description && item.description}</div>
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
    </FormDetailStyled>
  );
}

export default FormDetail;
