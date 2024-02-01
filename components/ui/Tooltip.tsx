import React, { useState } from 'react';
import { TooltipWrapper, TooltipStyled } from '@components/ui/Tooltip.styles';

type Props = {
  children: React.ReactNode;
  text: string;
};

// code
function Tooltip({ children, text }: Props) {
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
