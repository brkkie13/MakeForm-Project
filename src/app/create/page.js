'use client';
import styled from 'styled-components';
import { Fragment, useCallback, useState, useRef } from 'react';

// components
import Button from '../../../components/ui/button';
import ShortAnswerType from '../../../components/create/form-type/short-answer-type';
import LongAnswerType from '../../../components/create/form-type/long-answer-type';
import MultipleChoiceImageType from '../../../components/create/form-type/multiple-choice-image-type';
import MultipleChoiceTextType from '../../../components/create/form-type/multiple-choice-text-type';
import RatingType from '../../../components/create/form-type/rating-type';

import { sendFormData } from '@/redux/actions';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  const componentId = useRef(0);
  const [components, setComponents] = useState([]); //components는 배열.

  // 배열요소예시: { formType: 'multipleChoiceType', title: '~~', options: [ {text: '~~'}, { text: '~~'} ] }
  //props로 자식컴포넌트에 넘겨줄 value를 바꿔 components에 저장하는 함수.
  const changeValueHandler = (index, updatedValues) => {
    const newComponents = [...components];
    newComponents[index] = updatedValues;
    setComponents(newComponents);
  };

  //form추가버튼을 클릭했을 때 (단답형, 장문형, 객관식 등의 버튼)
  const addComponentHandler = useCallback(
    event => {
      const formType = event.target.value; //버튼 눌렀을 때 그 버튼이 가진 value속성의 값.
      setComponents([
        ...components,
        //배열 안의 객체 요소.
        {
          id: componentId.current,
          formType: formType,
          title: '',
        },
      ]);
      componentId.current++;
    },
    [components]
  );

  // 최종으로 '저장'버튼을 눌렀을 때 실행 (db에 저장됨)
  const saveFormHandler = () => {
    // data변수에 최종 저장해야할 값들 정리해보기.
    const data = {
      saveDate: new Date().toISOString(),
      items: components,
    };
    dispatch(sendFormData(data));
  };

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
        {components.map((component, idx) => (
          <Fragment key={component.id}>
            {
              component.formType === 'shortAnswerType' ? (
                <ShortAnswerType
                  index={idx}
                  value={component}
                  onChange={changeValueHandler}
                />
              ) : component.formType === 'longAnswerType' ? (
                <LongAnswerType
                  index={idx}
                  value={component}
                  onChange={changeValueHandler}
                />
              ) : component.formType === 'multipleChoiceImageType' ? (
                <MultipleChoiceImageType
                  index={idx}
                  value={component}
                  onChange={changeValueHandler}
                />
              ) : component.formType === 'multipleChoiceTextType' ? (
                <MultipleChoiceTextType
                  index={idx}
                  value={component}
                  onChange={changeValueHandler}
                />
              ) : component.formType === 'ratingType' ? (
                <RatingType
                  index={idx}
                  value={component}
                  onChange={changeValueHandler}
                />
              ) : null // 기본값이나 오류 처리를 위한 값 설정
            }
          </Fragment>
        ))}
      </div>

      <div className="controls">
        <Button onClick={saveFormHandler}>저장</Button>
      </div>
    </Section>
  );
}

export default CreatePage;
