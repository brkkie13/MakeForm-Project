// css
import { ModalStyled } from '@components/ui/Modal.styles';

// icons
import { CloseIcon } from '@components/assets/Icons';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '@/stores/store';
import { uiActions } from '@stores/features/uiSlice';
import { UiState } from '@/types/types';

// code
function Modal() {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const isModalOpen = useSelector((state: UiState) => state.ui.isModalOpen);
  const modalContent = useSelector((state: UiState) => state.ui.modalContent);

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
