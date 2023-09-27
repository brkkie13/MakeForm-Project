'use client';
import styled from 'styled-components';
import { useCallback, useState, useRef } from 'react';

// COMPONENTS
import Button from '../../ui/button';
import MultipleChoiceInput from '../ui/multiple-choice-input';
import RemoveBadge from '../../ui/remove-badge';
import TitleInput from '../ui/title-input';

// CSS
const Article = styled.article`
  padding: 20px 0;

  .titleInput {
    border-bottom: 3px solid #535fca;
    width: 98%;
    margin-bottom: 20px;
    font-size: 20px;
    padding: 5px;
  }

  .options {
    display: grid;
    grid: '. .';
    gap: 18px;
    margin-bottom: 15px;
  }

  .option {
    position: relative;
  }
`;

// CODE
function MultipleChoiceTextType({ index, value, onChange }) {
  // 객관식옵션 2개는 무조건 있어야 함.
  const [options, setOptions] = useState([
    { id: 0, text: '' },
    { id: 1, text: '' },
  ]);

  // ***객관식옵션 추가***
  let optionId = useRef(2); //필수옵션 두개에 이미 id 0,1을 부여했으므로 새로추가되는 옵션은 id:2부터 시작.
  const addOptionHandler = useCallback(() => {
    // '+옵션추가' 누를때마다 객관식 옵션이 추가된 후 (optionId: 2)
    setOptions([...options, { id: optionId.current, text: '' }]);
    optionId.current++; // optionId 1씩 증가 (optionId: 3)
  }, [options]);

  // ***객관식옵션 삭제***
  const removeOptionHandler = useCallback(
    id => {
      const updatedOptions = options.filter(option => option.id !== id);
      setOptions(updatedOptions);
    },
    [options]
  );

  //***부모컴포넌트로 변경된 title value를 넘겨줌***
  const changeTitleHandler = event => {
    const newValue = event.target.value;
    onChange(index, {
      ...value,
      title: newValue,
    });
  };

  // ***객관식옵션의 input값 수정 -> 부모컴포넌트로 변경된 option value를 넘겨줌***
  const changeOptionHandler = useCallback(
    (id, newValue) => {
      const updatedOptions = options.map(option =>
        option.id === id ? { ...option, text: newValue } : option
      );
      setOptions(updatedOptions);
      onChange(index, {
        ...value,
        options: options,
      });
    },
    [options]
  );

  return (
    <Article>
      <TitleInput value={value.title} onChange={changeTitleHandler} />

      <div className="options">
        {options.map((option, idx) => (
          <div className="option" key={option.id}>
            {/* 처음 두개옵션은 x표시 안뜨게 함. index가 2인 옵션부터 x표시 렌더링 */}
            {idx > 1 && (
              <RemoveBadge onClick={() => removeOptionHandler(option.id)} />
            )}
            <MultipleChoiceInput
              value={option.value}
              onChange={e => changeOptionHandler(option.id, e.target.value)}
            />
          </div>
        ))}
      </div>
      <Button onClick={addOptionHandler}>+ 옵션 추가</Button>
    </Article>
  );
}

export default MultipleChoiceTextType;
