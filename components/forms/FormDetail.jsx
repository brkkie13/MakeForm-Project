import React, { Fragment } from 'react';
import {
  FormDetailStyled,
  FormItemStyled,
  OptionsStyled,
} from './FormDetail.styles';
import StarRating from '../../helpers/StarRating';
import {
  EditIcon,
  EmptyCheckboxIcon,
  LinkIcon,
  TrashIcon,
} from '../../\bstyles/Icons';
import { IconButton } from '../ui/Button.styles';

function FormDetail({ form, onEdit, onRemove }) {
  return (
    <FormDetailStyled>
      <div className="controls">
        <IconButton>
          <LinkIcon />
        </IconButton>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onRemove}>
          <TrashIcon />
        </IconButton>
      </div>

      <h1>{form.header}</h1>

      {form.items?.map(item => (
        <FormItemStyled key={item.id}>
          <h2 className="title">{item.title && item.title}</h2>

          {item.formType === 'shortAnswerType' ? (
            <p className="placeholder-text">단답의 답변이 입력됩니다</p>
          ) : item.formType === 'longAnswerType' ? (
            <p className="placeholder-text">장문의 답변이 입력됩니다</p>
          ) : item.formType === 'ratingType' ? (
            <StarRating />
          ) : null}

          <div>{item.description && item.description}</div>

          <OptionsStyled>
            {item.options &&
              item.options.map(option => (
                <div key={option.id} className="option">
                  <EmptyCheckboxIcon />
                  <div>{option.text}</div>
                </div>
              ))}
          </OptionsStyled>
        </FormItemStyled>
      ))}
    </FormDetailStyled>
  );
}

export default FormDetail;
