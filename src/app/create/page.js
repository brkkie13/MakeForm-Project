'use client';
import styled from 'styled-components';
import { Fragment, useCallback, useState, useRef, useMemo } from 'react';

// components
import Button from '../../../components/ui/button';
import ShortAnswerType from '../../../components/create/form-type/short-answer-type';
import LongAnswerType from '../../../components/create/form-type/long-answer-type';
import MultipleChoiceImageType from '../../../components/create/form-type/multiple-choice-image-type';
import MultipleChoiceTextType from '../../../components/create/form-type/multiple-choice-text-type';
import RatingType from '../../../components/create/form-type/rating-type';

// CSS
const Section = styled.section`
  .controls {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .formBackground {
    background: #dee1ff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

// CODE
function CreatePage() {
  const [formComponents, setFormComponents] = useState([]); //폼 type 컴포넌트가 배열로 순서대로 쌓임.
  const componentId = useRef(0);

  // 추가한 각 form컴포넌트의 정보를 모아놓은 객체(formType, title, options키값이 존재)
  // 배열요소예시: { formType: 'multipleChoiceType', title: '~~', options: [ {text: '~~'}, { text: '~~'} ] }
  const [items, setItems] = useState([]);

  const addItemToItems = (formType, title, options) => {
    const newItems = { formType, title, options };
    setItems([...items, newItems]);
  };

  const addComponentHandler = useCallback(
    event => {
      const formType = event.target.value; //버튼 눌렀을 때 그 버튼이 가진 value속성의 값.

      switch (formType) {
        case 'shortAnswerType':
          setFormComponents([
            ...formComponents,
            { id: componentId.current, component: <ShortAnswerType /> },
          ]);
          componentId.current++;
          break;

        case 'longAnswerType':
          setFormComponents([
            ...formComponents,
            { id: componentId.current, component: <LongAnswerType /> },
          ]);
          componentId.current++;
          break;

        case 'multipleChoiceTextType':
          setFormComponents([
            ...formComponents,
            {
              id: componentId.current,
              component: <MultipleChoiceTextType addItem={addItemToItems} />,
            },
          ]);
          componentId.current++;
          break;

        case 'multipleChoiceImageType':
          setFormComponents([
            ...formComponents,
            { id: componentId.current, component: <MultipleChoiceImageType /> },
          ]);
          componentId.current++;
          break;

        case 'ratingType':
          setFormComponents([
            ...formComponents,
            { id: componentId.current, component: <RatingType /> },
          ]);
          componentId.current++;
          break;
      }
    },
    [formComponents]
  );

  // 최종으로 '저장'버튼을 눌렀을 때 실행 (db에 저장됨)
  const saveFormHandler = () => {
    // data변수에 최종 저장해야할 값들 정리해보기.
    const data = {
      saveDate: new Date().toISOString(),
    };
  };

  console.log(items);

  return (
    <Section>
      <div className="controls">
        <Button onClick={addComponentHandler} value="shortAnswerType">
          단답형
        </Button>
        <Button onClick={addComponentHandler} value="longAnswerType">
          장문형
        </Button>
        <Button onClick={addComponentHandler} value="multipleChoiceTextType">
          객관식(텍스트형)
        </Button>
        <Button onClick={addComponentHandler} value="multipleChoiceImageType">
          객관식(이미지형)
        </Button>
        <Button onClick={addComponentHandler} value="ratingType">
          평점
        </Button>
      </div>

      <div className="formBackground">
        {formComponents.map(formComponent => (
          <Fragment key={formComponent.id}>{formComponent.component}</Fragment>
        ))}
      </div>

      <div className="controls">
        <Button onClick={saveFormHandler}>저장</Button>
      </div>
    </Section>
  );
}

export default CreatePage;
