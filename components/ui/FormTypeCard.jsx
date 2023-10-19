import { FormTypeWrapper } from './FormTypeCard.styles';
import TrashIcon from '../icons/TrashIcon';

const FormTypeCard = props => {
  return (
    <FormTypeWrapper>
      <div>{props.children}</div>
      <div className="trash-icon">
        <TrashIcon />
      </div>
    </FormTypeWrapper>
  );
};

export default FormTypeCard;
