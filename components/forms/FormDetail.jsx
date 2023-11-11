import React, { Fragment, useCallback, useState } from 'react';
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
import Tooltip from '../ui/Tooltip';
import { IconButtonStyled } from '../ui/Button';

function FormDetail({ form, onEdit, onRemove }) {
  return (
    <FormDetailStyled>
      <div className="controls">
        <Tooltip text="링크 복사">
          <IconButtonStyled>
            <LinkIcon />
          </IconButtonStyled>
        </Tooltip>

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
