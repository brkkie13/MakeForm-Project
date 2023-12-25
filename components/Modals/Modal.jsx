// css
import { ModalStyled } from '@components/modals/Modal.styles';

// icons
import { CloseIcon } from '@styles/Icons';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '@redux/features/uiSlice';

// code
function Modal() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.ui.isModalOpen);
  const modalContent = useSelector(state => state.ui.modalContent);

  const closeModalHandler = () => {
    dispatch(uiActions.closeModal());
  };

  return (
    <>
      {isModalOpen && (
        <ModalStyled>
          <div className="modal-background" onClick={closeModalHandler}></div>
          <div className="modal-content">
            <div className="header" onClick={closeModalHandler}>
              <CloseIcon />
            </div>
            <div className="body">{modalContent}</div>
            <div className="footer"></div>
          </div>
        </ModalStyled>
      )}
    </>
  );
}

export default Modal;
