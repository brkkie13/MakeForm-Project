import { ErrorBoxStyled } from './ErrorBox.styles';
import { CautionIcon } from '../../\bstyles/Icons';

function ErrorBox({ message }) {
  return (
    <ErrorBoxStyled>
      <CautionIcon />
      <p>{message}</p>
    </ErrorBoxStyled>
  );
}

export default ErrorBox;
