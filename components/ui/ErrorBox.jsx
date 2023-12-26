import { ErrorBoxStyled } from '@components/ui/ErrorBox.styles';
import { CautionIcon } from '@components/assets/Icons';

function ErrorBox({ message }) {
  return (
    <ErrorBoxStyled>
      <CautionIcon />
      <p>{message}</p>
    </ErrorBoxStyled>
  );
}

export default ErrorBox;
