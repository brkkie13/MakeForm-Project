import React from 'react';
import { FormTypeCardStyled } from '@components/form-types/FormTypeCard.styles';
import { IconButtonStyled } from '@components/ui/Buttons';
import Tooltip from '@components/ui/Tooltip';

// icons
import { DragIcon, TrashIcon } from '@/public/svgs/Icons';

//types
interface Props {
  idx?: number;
  onRemoveFormType?: (idx: number) => void;
  content: React.ReactNode;
  isHeader?: boolean;
}

// code
const FormTypeCard = ({ idx, onRemoveFormType, content, isHeader }: Props) => {
  const removeFormTypeHandler = () => {
    // if문 조건 안에 idx만 적어주면 idx=0일 경우 falsy값으로 처리되어 에러 생김. 꼭 !== undefined로 타입가드 만들 것.
    if (idx !== undefined && onRemoveFormType) onRemoveFormType(idx);
  };

  return (
    <FormTypeCardStyled>
      <div className="icon">
        {!isHeader && (
          <IconButtonStyled className="drag-icon">
            <DragIcon />
          </IconButtonStyled>
        )}
      </div>
      <div className="content">{content}</div>
      <div className="icon">
        {!isHeader && (
          <Tooltip text="삭제">
            <IconButtonStyled onClick={removeFormTypeHandler}>
              <TrashIcon />
            </IconButtonStyled>
          </Tooltip>
        )}
      </div>
    </FormTypeCardStyled>
  );
};

export default FormTypeCard;
