import { ConfirmStyled } from '@components/ui/Confirm.styles';
import {
  OutlinedButtonStyled,
  FilledButtonStyled,
} from '@components/ui/Buttons';
import { CautionIcon } from '@components/assets/Icons';

// redux
import { useDispatch } from 'react-redux';
import { uiActions } from '@stores/features/uiSlice';

// code
function Confirm({ text, onclickConfirm }) {
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
        <FilledButtonStyled onClick={onclickConfirm}>확인</FilledButtonStyled>
      </div>
    </ConfirmStyled>
  );
}

export default Confirm;
