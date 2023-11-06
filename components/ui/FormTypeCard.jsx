import { FormTypeWrapper } from './FormTypeCard.styles';

// icons
import { DragIcon, TrashIcon } from '../../\bstyles/Icons';

const FormTypeCard = ({ onRemoveFormType, content, isHeader }) => {
  return (
    <FormTypeWrapper>
      <div className="icon drag-icon">{!isHeader && <DragIcon />}</div>
      <div>{content}</div>
      <div className="icon trash-icon" onClick={onRemoveFormType}>
        {!isHeader && <TrashIcon />}
      </div>
    </FormTypeWrapper>
  );
};

export default FormTypeCard;
