import React from 'react';
import { FormTypeCardStyled } from '@components/form-types/FormTypeCard.styles';
import { IconButtonStyled } from '@components/ui/Buttons';
import Tooltip from '@components/ui/Tooltip';

// icons
import { DragIcon, TrashIcon } from '@/public/svgs/Icons';

//types
interface Props {
  id?: number;
  onRemoveFormType?: (id: number) => void;
  content: React.ReactNode;
  isHeader?: boolean;
}

// code
const FormTypeCard = ({ id, onRemoveFormType, content, isHeader }: Props) => {
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
            <IconButtonStyled
              onClick={() => onRemoveFormType && id && onRemoveFormType(id)}
            >
              <TrashIcon />
            </IconButtonStyled>
          </Tooltip>
        )}
      </div>
    </FormTypeCardStyled>
  );
};

export default FormTypeCard;
