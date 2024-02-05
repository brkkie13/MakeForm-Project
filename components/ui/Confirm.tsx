import { ConfirmStyled } from '@components/ui/Confirm.styles';
import {
  OutlinedButtonStyled,
  FilledButtonStyled,
} from '@components/ui/Buttons';
import { CautionIcon } from '@/public/svgs/Icons';

// redux
import { useDispatch } from 'react-redux';
import { uiActions } from '@stores/features/uiSlice';

type Props = {
  text: string;
  onClickConfirm: () => void;
};

// code
// 부모 컴포넌트: app/forms/[formId]/page.tsx, app/analysis/[responsesId]/page.tsx, UserProfile.tsx
function Confirm({ text, onClickConfirm }: Props) {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(uiActions.closeModal());
  };

  return (
    <ConfirmStyled>
      <CautionIcon />
      <p>{text}</p>
      <div className="controls">
        <OutlinedButtonStyled onClick={closeModalHandler}>
          취소
        </OutlinedButtonStyled>
        <FilledButtonStyled onClick={onClickConfirm}>확인</FilledButtonStyled>
      </div>
    </ConfirmStyled>
  );
}

export default Confirm;
