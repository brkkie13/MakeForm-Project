import React, { useEffect, useRef } from 'react';
import { DropdownMenuStyled } from '@components/ui/DropdownMenu.styles';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '@/stores/store';
import { uiActions } from '@stores/features/uiSlice';

// types
import { DropdownMenuList, UiState } from '@/types/types';

type Props = {
  menuList: DropdownMenuList;
};

// code
// 부모 컴포넌트: Navbar
function DropdownMenu({ menuList }: Props) {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const isDropdownOpen = useSelector(
    (state: UiState) => state.ui.isDropdownOpen
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageClickEvent = (e: Event) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target as Node)
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
