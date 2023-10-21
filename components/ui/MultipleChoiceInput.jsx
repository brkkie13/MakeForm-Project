// components
import CheckboxIcon from '../icons/CheckboxIcon';
import { Label } from './MultipleChoiceInput.styles';

function MultipleChoiceInput(props) {
  return (
    <Label>
      <CheckboxIcon />
      <input {...props} placeholder="입력" />
    </Label>
  );
}

export default MultipleChoiceInput;
