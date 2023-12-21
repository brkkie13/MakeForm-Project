'use client';
import { SummaryCardStyled } from './SummaryCard.styles';
import { ReloadIcon } from '../../\bstyles/Icons';

function SummaryCard(props) {
  return (
    <SummaryCardStyled>
      <div className="title">
        <h2>{props.title}</h2>
        <ReloadIcon />
      </div>
      <div className="count">
        <span className="count-badge">{props.badge}</span>
        <span className="count-number">{props.countNum}</span>
        <span className="count-text">건</span>
      </div>
    </SummaryCardStyled>
  );
}

export default SummaryCard;
