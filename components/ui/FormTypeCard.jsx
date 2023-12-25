import { FormTypeCardStyled } from '@components/ui/FormTypeCard.styles';
import { IconButtonStyled } from '@components/ui/Buttons';
import Tooltip from '@components/ui/Tooltip';

// icons
import { DragIcon, TrashIcon } from '@styles/Icons';

const FormTypeCard = ({ onRemoveFormType, content, isHeader }) => {
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
            <IconButtonStyled onClick={onRemoveFormType}>
              <TrashIcon />
            </IconButtonStyled>
          </Tooltip>
        )}
      </div>
    </FormTypeCardStyled>
  );
};

export default FormTypeCard;
