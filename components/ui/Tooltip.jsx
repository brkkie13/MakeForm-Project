import { TooltipWrapper, TooltipStyled } from './Tooltip.styles';
import { useState } from 'react';

function Tooltip({ children, text }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipWrapper
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <TooltipStyled>{text}</TooltipStyled>}
    </TooltipWrapper>
  );
}

export default Tooltip;
