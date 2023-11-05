// css
import { ModalBackground, ModalContainer } from './Modal.styles';

// icons
import { CloseIcon } from '../../\bstyles/Icons';

// components
import AuthForm from '../auth/AuthForm';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../redux/features/uiSlice';

function Modal({ children }) {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.ui.isModalOpen);

  const closeModalHandler = () => {
    dispatch(uiActions.toggleModal());
    dispatch(uiActions.toggleLoginMode()); // 창 닫으면 isLoginMode를 true로 변경
  };

  return (
    <>
      {isModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <div className="header" onClick={closeModalHandler}>
              <CloseIcon />
            </div>
            <div className="body">
              <AuthForm />
              {children}
            </div>
            <div className="footer"></div>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
}

export default Modal;
