import { FormTypeCardStyled } from './FormTypeCard.styles';
import { IconButtonStyled } from './Button.styles';

// icons
import { DragIcon, TrashIcon } from '../../\bstyles/Icons';

const FormTypeCard = ({ onRemoveFormType, content, isHeader }) => {
  return (
    <FormTypeCardStyled>
      <div className="icon drag-icon">{!isHeader && <DragIcon />}</div>
      <div>{content}</div>
      <div className="icon trash-icon" onClick={onRemoveFormType}>
        {!isHeader && (
          <IconButtonStyled>
            <TrashIcon />
          </IconButtonStyled>
        )}
      </div>
    </FormTypeCardStyled>
  );
};

export default FormTypeCard;
