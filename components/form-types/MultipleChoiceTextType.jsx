'use client';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';

// components
import Button from '../ui/Button';
import MultipleChoiceInput from '../ui/MultipleChoiceInput';
import RemoveBadge from '../ui/RemoveBadge';
import TitleInput from '../ui/TitleInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';
import { myFormActions } from '../../redux/features/myFormSlice';

// css
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

// code
function MultipleChoiceTextType({ index, editItem }) {
  const dispatch = useDispatch();

  // '/[formId]/edit'페이지에서 'editItem'을 전달 받았을 때 실행
  if (editItem) {
    const editItems = useSelector(state => state.myForm.editItems);
    const itemIndex = editItems.findIndex(item => item.id === editItem.id);
    const options = editItems[itemIndex].options;
    // options배열에서 마지막 옵션 id를 추출해 옵션추가시 +1씩 증가시켜 옵션 id를 설정.
    let lastOptionId = options[options.length - 1].id;

    const addOptionHandler = () => {
      lastOptionId++;
      dispatch(myFormActions.addOption({ itemIndex, lastOptionId }));
    };

    const removeOptionHandler = clickedOptionId => {
      dispatch(myFormActions.removeOption({ itemIndex, clickedOptionId }));
    };

    const changeTitleHandler = event => {
      const newValue = event.target.value;
      dispatch(myFormActions.changeTitle({ itemIndex, newValue }));
    };

    const changeOptionHandler = (optionId, event) => {
      const newValue = event.target.value;
      dispatch(myFormActions.changeOption({ itemIndex, optionId, newValue }));
    };

    console.log('multipleChoiceTextType =>', options);

    return (
      <Article>
        <TitleInput
          name="title"
          value={editItems[itemIndex].title}
          onChange={changeTitleHandler}
        />

        <div className="options">
          {options.map((option, idx) => (
            <div className="option" key={option.id}>
              {/* 처음 두개옵션은 x표시 안뜨게 함. index가 2인 옵션부터 x표시 렌더링 */}
              {idx > 1 && (
                <RemoveBadge onClick={() => removeOptionHandler(option.id)} />
              )}
              <MultipleChoiceInput
                name="text"
                value={option.text}
                onChange={event => changeOptionHandler(option.id, event)}
              />
            </div>
          ))}
        </div>
        <Button onClick={addOptionHandler}>+ 옵션 추가</Button>
      </Article>
    );
  }

  // '/create'페이지에서 components배열의 'index'를 전달 받았을 때 실행
  const components = useSelector(state => state.form.components);

  const options = components[index].options;

  const addOptionHandler = () => {
    dispatch(formActions.addOption(index));
  };

  const removeOptionHandler = id => {
    dispatch(formActions.removeOption({ index, id }));
  };

  const changeTitleHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeTitle({ index, newValue }));
  };

  const changeOptionHandler = (optionId, event) => {
    const newValue = event.target.value;
    dispatch(formActions.changeOption({ index, optionId, newValue }));
  };

  return (
    <Article>
      <TitleInput
        name="title"
        value={components[index].title}
        onChange={changeTitleHandler}
      />

      <div className="options">
        {options.map((option, idx) => (
          <div className="option" key={option.id}>
            {/* 처음 두개옵션은 x표시 안뜨게 함. index가 2인 옵션부터 x표시 렌더링 */}
            {idx > 1 && (
              <RemoveBadge onClick={() => removeOptionHandler(option.id)} />
            )}
            <MultipleChoiceInput
              name="text"
              value={option.text}
              onChange={event => changeOptionHandler(option.id, event)}
            />
          </div>
        ))}
      </div>
      <Button onClick={addOptionHandler}>+ 옵션 추가</Button>
    </Article>
  );
}

export default MultipleChoiceTextType;
