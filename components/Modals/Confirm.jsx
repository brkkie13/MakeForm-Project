import { ConfirmStyled } from './Confirm.styles';
import { OutlinedButtonStyled, FilledButtonStyled } from '../ui/Buttons';
import { CautionIcon } from '../../\bstyles/Icons';
import { uiActions } from '../../redux/features/uiSlice';
import { useDispatch } from 'react-redux';

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
