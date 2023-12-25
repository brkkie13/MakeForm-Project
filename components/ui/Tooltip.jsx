import { useState } from 'react';
import { TooltipWrapper, TooltipStyled } from '@components/ui/Tooltip.styles';

// code
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
