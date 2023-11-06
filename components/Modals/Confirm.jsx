import styled from 'styled-components';
import { Button } from '../ui/Button.styles';
import { uiActions } from '../../redux/features/uiSlice';
import { useDispatch } from 'react-redux';

function Confirm({ text, onclickConfirm }) {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(uiActions.closeModal());
  };

  return (
    <ConfirmStyled>
      <p>{text}</p>
      <div className="controls">
        <Button onClick={closeModalHandler}>취소</Button>
        <Button primary="highlight" onClick={onclickConfirm}>
          확인
        </Button>
      </div>
    </ConfirmStyled>
  );
}

const ConfirmStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 20px;
  }

  .controls {
    width: 100%;
    display: flex;
    gap: 10px;
  }

  button {
    flex: 5;
  }
`;

export default Confirm;
