import { RemoveBadgeWrapper } from './RemoveBadge.styles';
import XIcon from './XIcon';

function RemoveBadge(props) {
  return (
    <RemoveBadgeWrapper {...props}>
      <XIcon />
    </RemoveBadgeWrapper>
  );
}

export default RemoveBadge;
