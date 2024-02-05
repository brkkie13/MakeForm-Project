import { ThemeSwitchStyled } from '@components/ui/ThemeSwitch.styles';
import { DarkModeIcon, LightModeIcon } from '@/public/svgs/Icons';

type Props = {
  isToggled: boolean;
  onToggle: () => void;
};

// code
// 부모 컴포넌트: Navbar
function ThemeSwitch({ isToggled, onToggle }: Props) {
  return (
    <ThemeSwitchStyled>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span>
        <div className={!isToggled ? 'align-right' : ''}>
          {isToggled ? <LightModeIcon /> : <DarkModeIcon />}
        </div>
      </span>
    </ThemeSwitchStyled>
  );
}

export default ThemeSwitch;
