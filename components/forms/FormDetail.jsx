'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  FormDetailStyled,
  FormItemStyled,
  OptionsStyled,
} from './FormDetail.styles';
import StarRating from '../../helpers/StarRating';
import { LinkIcon, EditIcon, TrashIcon } from '../../\bstyles/Icons';
import Tooltip from '../ui/Tooltip';
import Button, { IconButtonStyled } from '../ui/Button';
import MultipleChoiceInput from '../ui/MultipleChoiceInput';
import { useDispatch, useSelector } from 'react-redux';
import { responsesActions } from '../../redux/features/responsesSlice';
import { uiActions } from '../../redux/features/uiSlice';

// code
// formDetail: 관리자모드의 폼 미리보기 페이지.
// sharedForm: 유저가 실제로 작성하는 공유된 폼 페이지.
function FormDetail({ formDetail, onEdit, onRemove, sharedForm }) {
  const dispatch = useDispatch();
  const responses = useSelector(state => state.responses.responses);

  const form = formDetail ? formDetail : sharedForm ? sharedForm : null;
  const [isSharedForm, setIsSharedForm] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (sharedForm) {
      setIsSharedForm(true);
      dispatch(responsesActions.setInitialValue(form.items));
    }
  }, [sharedForm]);

  const changeInputValueHandler = (itemIdx, event) => {
    const newValue = event.target.value;
    dispatch(responsesActions.changeInputValue({ itemIdx, newValue }));
  };

  const changeRatingHandler = (itemIdx, score) => {
    dispatch(responsesActions.changeRatingValue({ itemIdx, score }));
  };

  const changeOptionHandler = (itemIdx, optionIdx) => {
    // 선택한 객관식 옵션의 인덱스번호를 저장.
    dispatch(responsesActions.changeOptionValue({ itemIdx, optionIdx }));
  };

  console.log(responses);

  const submitFormHandler = async event => {
    event.preventDefault();

    const data = {
      formId: form.id,
      header: form.header,
      submissionDate: new Date().toISOString(),
      responses: responses,
    };

    const res = await axios.post('/api/submitted-form', data);

    if (res.data.error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: '제출에 실패했습니다.',
        })
      );

      setTimeout(() => {
        dispatch(uiActions.clearNotification());
      }, 3000);
      return;
    }

    setSuccess(true);
  };

  // res.ok일 때 제출 완료 되었다는 페이지 만들기
  if (success) {
    return (
      <FormDetailStyled>
        <p>제출이 완료되었습니다. 감사합니다.</p>
      </FormDetailStyled>
    );
  }

  return (
    <FormDetailStyled>
      <div className="controls">
        <Tooltip text="공유">
          <IconButtonStyled onClick={onRemove}>
            <LinkIcon />
          </IconButtonStyled>
        </Tooltip>

        {!isSharedForm && (
          <>
            <Tooltip text="편집">
              <IconButtonStyled onClick={onEdit}>
                <EditIcon />
              </IconButtonStyled>
            </Tooltip>

            <Tooltip text="삭제">
              <IconButtonStyled onClick={onRemove}>
                <TrashIcon />
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
              isSharedForm ? (
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
              isSharedForm ? (
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

            <OptionsStyled>
              {item.options &&
                item.options.map((option, optionIdx) =>
                  isSharedForm ? (
                    <MultipleChoiceInput
                      key={option.id}
                      optionIndex={optionIdx}
                      optionText={option.text}
                      checkable={true}
                      onChangeOption={() =>
                        changeOptionHandler(itemIdx, optionIdx)
                      }
                    />
                  ) : (
                    <MultipleChoiceInput
                      key={option.id}
                      optionText={option.text}
                    />
                  )
                )}
            </OptionsStyled>

            <div>{item.description && item.description}</div>
          </FormItemStyled>
        ))}
      </div>

      {isSharedForm && (
        <div className="submit-button">
          <Button onClick={submitFormHandler}>제출하기</Button>
        </div>
      )}
    </FormDetailStyled>
  );
}

export default FormDetail;
