import { FormTypeWrapper } from './FormTypeCard.styles';
import DragIcon from '../icons/DragIcon';
import TrashIcon from '../icons/TrashIcon';

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
