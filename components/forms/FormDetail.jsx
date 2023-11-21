import { useState, useEffect } from 'react';
import {
  FormDetailStyled,
  FormItemStyled,
  OptionsStyled,
} from './FormDetail.styles';
import StarRating from '../../helpers/StarRating';
import {
  EmptyCheckboxIcon,
  LinkIcon,
  EditIcon,
  TrashIcon,
} from '../../\bstyles/Icons';
import Tooltip from '../ui/Tooltip';
import { IconButtonStyled } from '../ui/Button';
import MultipleChoiceInput from '../ui/MultipleChoiceInput';

// code
function FormDetail({ formDetail, onEdit, onRemove, sharedForm }) {
  // formDetail: 관리자모드의 폼 미리보기 페이지.
  // sharedForm: 유저가 실제로 작성하는 공유된 폼 페이지.
  const form = formDetail ? formDetail : sharedForm ? sharedForm : null;
  const [isSharedForm, setIsSharedForm] = useState(false);

  useEffect(() => {
    sharedForm && setIsSharedForm(true);
  }, []);

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

      <h1>{form.header}</h1>

      {form.items?.map(item => (
        <FormItemStyled key={item.id}>
          <h2 className="title">{item.title && item.title}</h2>

          {item.formType === 'shortAnswerType' ? (
            isSharedForm ? (
              <input type="text" placeholder="답변을 입력하세요" />
            ) : (
              <p className="placeholder-text">단답의 답변이 입력됩니다</p>
            )
          ) : item.formType === 'longAnswerType' ? (
            isSharedForm ? (
              <textarea placeholder="답변을 입력하세요"></textarea>
            ) : (
              <p className="placeholder-text">장문의 답변이 입력됩니다</p>
            )
          ) : item.formType === 'ratingType' ? (
            <StarRating />
          ) : null}

          <OptionsStyled>
            {item.options &&
              item.options.map(option =>
                isSharedForm ? (
                  <MultipleChoiceInput
                    key={option.id}
                    optionId={option.id}
                    optionText={option.text}
                    checkable={true}
                  />
                ) : (
                  <MultipleChoiceInput
                    key={option.id}
                    optionId={option.id}
                    optionText={option.text}
                  />
                )
              )}
          </OptionsStyled>

          <div>{item.description && item.description}</div>
        </FormItemStyled>
      ))}
    </FormDetailStyled>
  );
}

export default FormDetail;
