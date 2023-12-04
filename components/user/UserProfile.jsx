import Image from 'next/image';
import { UserProfileStyled } from './UserProfile.styles';
import { Button } from '../ui/Button.styles';
import { logout } from '../../redux/actions/authActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../redux/features/uiSlice';
import DropdownMenu from '../ui/DropdownMenu';

function UserProfile({ imageUrl, displayName, email }) {
  const dispatch = useDispatch();
  const isDropdownOpen = useSelector(state => state.ui.isDropdownOpen);

  const toggleDropdownMenuHandler = e => {
    e.stopPropagation(); // DropdownMenu 상위요소 window로 버블링을 막음.
    dispatch(uiActions.toggleDropdownMenu());
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const menuList = [
    { id: 0, text: '로그아웃', onClick: logoutHandler },
    { id: 1, text: '비밀번호 변경' },
    { id: 2, text: '회원탈퇴' },
  ];

  const activeUserInfo = isDropdownOpen ? 'user-info active' : 'user-info';

  return (
    <UserProfileStyled>
      <div className={activeUserInfo} onClick={toggleDropdownMenuHandler}>
        <Image
          src={imageUrl || '/images/profile.png'}
          alt="유저 프로필"
          width={30}
          height={30}
        />
        <span>{displayName || email}님</span>
      </div>

      {isDropdownOpen && <DropdownMenu menuList={menuList} />}
      <div className="controls">
        {menuList.map(menu => (
          <Button primary="non-outline" key={menu.id} onClick={menu.onClick}>
            {menu.text}
          </Button>
        ))}
      </div>
    </UserProfileStyled>
  );
}

export default UserProfile;
