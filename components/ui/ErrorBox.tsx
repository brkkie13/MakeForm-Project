import { ErrorBoxStyled } from '@components/ui/ErrorBox.styles';
import { CautionIcon } from '@/public/svgs/Icons';

type Props = {
  message: string;
};

function ErrorBox({ message }: Props) {
  return (
    <ErrorBoxStyled>
      <CautionIcon />
      <p>{message}</p>
    </ErrorBoxStyled>
  );
}

export default ErrorBox;
