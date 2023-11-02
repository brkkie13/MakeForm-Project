import { Label } from './ToggleSwitch.styles';
import { DarkModeIcon, LightModeIcon } from '../\bstyles/Icons';

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
