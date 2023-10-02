'use client';
import styled from 'styled-components';

// components
import Button from '../../ui/button';
import MultipleChoiceInput from '../ui/multiple-choice-input';
import RemoveBadge from '../../ui/remove-badge';
import TitleInput from '../ui/title-input';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@/redux/features/form-slice';

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
function MultipleChoiceTextType({ index }) {
  const dispatch = useDispatch();
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
    dispatch(formActions.changeTitleValue({ index, newValue }));
  };

  const changeOptionHandler = (optionId, event) => {
    const newValue = event.target.value;
    dispatch(formActions.changeOptionValue({ index, optionId, newValue }));
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
