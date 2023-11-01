import { FormTypeWrapper } from './FormTypeCard.styles';

// icons
import { DragIcon, TrashIcon } from '../../\bstyles/Icons';

const FormTypeCard = props => {
  return (
    <FormTypeWrapper>
      <div className="icon drag-icon">
        <DragIcon />
      </div>
      <div>{props.children}</div>
      <div className="icon trash-icon">
        <TrashIcon />
      </div>
    </FormTypeWrapper>
  );
};

export default FormTypeCard;
