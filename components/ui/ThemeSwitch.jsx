import { ThemeSwitchStyled } from '@components/ui/ThemeSwitch.styles';
import { DarkModeIcon, LightModeIcon } from '@components/assets/Icons';

// code
function ThemeSwitch({ isToggled, onToggle }) {
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
