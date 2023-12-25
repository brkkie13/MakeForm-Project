import { Label } from '@helpers/ToggleSwitch.styles';
import { DarkModeIcon, LightModeIcon } from '@styles/Icons';

function ToggleSwitch({ isToggled, onToggle }) {
  return (
    <Label>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span>
        <div className={!isToggled ? 'align-right' : ''}>
          {isToggled ? <LightModeIcon /> : <DarkModeIcon />}
        </div>
      </span>
    </Label>
  );
}

export default ToggleSwitch;
