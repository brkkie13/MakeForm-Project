'use client';
import styled from 'styled-components';
import ReloadIcon from '../icons/ReloadIcon';

const Article = styled.article`
  width: 200px;
  height: 160px;
  border: 1px solid #dddddd;
  border-radius: 7px;

  .content {
    margin: 10px;
  }
  .title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .count {
    display: flex;
    justify-content: end;
    align-items: baseline;
  }

  .count__badge {
    font-size: 11px;
    font-weight: bold;
    border: 1px solid #f44336;
    border-radius: 20px;
    padding: 3px 8px;
    color: #f44336;
    margin-right: 5px;
  }

  .count__number {
    font-size: 27px;
    font-weight: bold;
  }
`;

function FormSummaryCard(props) {
  return (
    <Article>
      <div className="content">
        <div className="title">
          <h2>{props.title}</h2>
          <ReloadIcon />
        </div>
        <div className="count">
          <span className="count__badge">{props.badge}</span>
          <span className="count__number">{props.countNum}</span>
          <span className="count__text">건</span>
        </div>
      </div>
    </Article>
  );
}

export default FormSummaryCard;
