import Image from 'next/image';
import { UserProfileStyled } from '@components/user/UserProfile.styles';
import { ButtonStyled } from '@components/ui/Buttons';
import Confirm from '@components/modals/Confirm';

// redux
import { useDispatch } from 'react-redux';
import { uiActions } from '@redux/features/uiSlice';
import {
  deleteAccount,
  logout,
  resetPassword,
} from '@redux/actions/authActionCreators';

// code
function UserProfile({ imageUrl, displayName, email, emailVerified }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const resetPasswordHandler = () => {
    dispatch(resetPassword(email));
  };

  const deleteAccountHandler = () => {
    const clickConfirmHandler = () => {
      dispatch(uiActions.closeModal());
      dispatch(deleteAccount());
    };

    dispatch(
      uiActions.openModal(
        <Confirm
          text="정말 탈퇴하시겠습니까? 영구적으로 계정이 삭제됩니다."
          onclickConfirm={clickConfirmHandler}
        />
      )
    );
  };

  return (
    <UserProfileStyled>
      <div className="user-info">
        <Image
          src={imageUrl || '/images/profile.png'}
          alt="유저 프로필"
          width={30}
          height={30}
        />
        <span>{displayName || email}</span>
      </div>

      <div className="controls">
        <ButtonStyled onClick={logoutHandler}>로그아웃</ButtonStyled>
        {/* 이메일&비밀번호로 가입했을 때만 비밀번호 재설정 버튼 활성화 */}
        {!emailVerified && (
          <ButtonStyled onClick={resetPasswordHandler}>
            비밀번호 재설정
          </ButtonStyled>
        )}
        <ButtonStyled onClick={deleteAccountHandler}>회원탈퇴</ButtonStyled>
      </div>
    </UserProfileStyled>
  );
}

export default UserProfile;
