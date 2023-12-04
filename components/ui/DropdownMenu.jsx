import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DropdownMenuStyled } from './DropdownMenu.styles';
import { uiActions } from '../../redux/features/uiSlice';

function DropdownMenu({ menuList }) {
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
  }, [isDropdownOpen, dispatch]);

  return (
    <DropdownMenuStyled ref={dropdownRef}>
      <ul>
        {menuList.map(menu => (
          <li key={menu.id} onClick={menu.onClick}>
            {menu.text}
          </li>
        ))}
      </ul>
    </DropdownMenuStyled>
  );
}

export default DropdownMenu;
