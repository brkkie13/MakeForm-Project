import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { UserProfileStyled } from './UserProfile.styles';
import { Button } from '../ui/Button.styles';
import { logout } from '../../redux/actions/authActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../redux/features/uiSlice';

function UserProfile({ imageUrl, displayName, email }) {
  const dispatch = useDispatch();
  const isDropdownOpen = useSelector(state => state.ui.isDropdownOpen);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const pageClickEvent = e => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        dispatch(uiActions.toggleDropdownMenu());
      }
    };

    if (isDropdownOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isDropdownOpen]);

  const toggleDropdownMenuHandler = () => {
    dispatch(uiActions.toggleDropdownMenu());
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const activeUserInfo = isDropdownOpen ? 'user-info active' : 'user-info';

  return (
    <UserProfileStyled ref={dropdownRef}>
      <div className={activeUserInfo} onClick={toggleDropdownMenuHandler}>
        <Image
          src={imageUrl || '/images/profile.png'}
          alt="유저 프로필"
          width={30}
          height={30}
        />
        <span>{displayName || email}님</span>
      </div>

      {isDropdownOpen && (
        <div className="dropdown">
          <ul>
            <li onClick={logoutHandler}>로그아웃</li>
          </ul>
        </div>
      )}
      <div className="controls">
        <Button primary="non-outline" onClick={logoutHandler}>
          로그아웃
        </Button>
      </div>
    </UserProfileStyled>
  );
}

export default UserProfile;
