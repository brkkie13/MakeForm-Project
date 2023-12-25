import { ErrorBoxStyled } from '@components/ui/ErrorBox.styles';
import { CautionIcon } from '@styles/Icons';

function ErrorBox({ message }) {
  return (
    <ErrorBoxStyled>
      <CautionIcon />
      <p>{message}</p>
    </ErrorBoxStyled>
  );
}

export default ErrorBox;
