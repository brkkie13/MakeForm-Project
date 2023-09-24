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
function MultipleChoiceTextType(props) {
  //const [titleInput, setTitleInput] = useState('');

  let optionId = useRef(2); //필수옵션 두개에 이미 id 0,1을 부여했으므로 새로추가되는 옵션은 id: 2부터 시작.

  const [options, setOptions] = useState([
    // 객관식옵션은 기본 2개는 무조건 있어야 함.
    { id: 0, component: <MultipleChoiceInput />, value: '' },
    { id: 1, component: <MultipleChoiceInput />, value: '' },
  ]);

  // ***객관식옵션의 value들을 배열로 저장하여 부모컴포넌트로 데이터를 넘김***
  //const optionValues = options.map(option => ({ text: option.value }));
  //props.addItem('multipleChoiceTextType', titleInput, optionValues);

  const changeTitleHandler = event => {
    const newValue = event.target.value;
    props.onChange(props.index, { ...props.value, title: newValue });
  };

  const changeOptionsHandler = event => {
    const newValue = event.target.value;
    props.onChange(props.index, {
      ...props.value,
      options: { text: newValue },
    });
  };

  // ***객관식옵션 추가***
  const addOptionHandler = useCallback(() => {
    // '+옵션추가' 누를때마다 객관식 옵션이 추가된 후 (optionId: 2)
    setOptions([
      ...options,
      { id: optionId.current, component: <MultipleChoiceInput />, value: '' },
    ]);
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

  // ***객관식옵션 input값 수정***
  const changeOptionInputs = useCallback(
    (id, newValue) => {
      const updatedOptions = options.map(option =>
        option.id === id ? { ...option, value: newValue } : option
      );
      setOptions(updatedOptions);
    },
    [options]
  );

  return (
    <Article>
      <TitleInput value={props.value.title} onChange={changeTitleHandler} />

      <div className="options">
        {options.map((option, idx) => (
          <div className="option" key={option.id}>
            {/* 처음 두개옵션은 x표시 안뜨게 함. index가 2인 옵션부터 x표시 렌더링 */}
            {idx > 1 && (
              <RemoveBadge onClick={() => removeOptionHandler(option.id)} />
              // onClick 안에 꼭 익명함수(화살표함수) 넣어야 함.
              // {함수명(option.id)} 이런 식으로 바로 호출하면 클릭했을 때 실행되는 게 아니라 즉시 실행하려고 함. 오류발생.
            )}
            <MultipleChoiceInput
              value={props.value.options.text}
              onChange={changeOptionsHandler}
            />
          </div>
        ))}
      </div>
      <Button onClick={addOptionHandler}>+ 옵션 추가</Button>
    </Article>
  );
}

export default MultipleChoiceTextType;
