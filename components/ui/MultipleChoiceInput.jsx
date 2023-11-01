import { Label } from './MultipleChoiceInput.styles';
import { EmptyCheckboxIcon } from '../../\bstyles/Icons';

function MultipleChoiceInput(props) {
  return (
    <Label>
      <EmptyCheckboxIcon />
      <input {...props} placeholder="입력" />
    </Label>
  );
}

export default MultipleChoiceInput;
