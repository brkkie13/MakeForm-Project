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

// redux
import { sendFormData } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@/redux/features/form-slice';

// CSS
const Section = styled.section`
  margin: 0;
  background: ${props => props.theme.colors.background2};

  .controls {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .controls__form-type {
    background: ${props => props.theme.colors.background};
    padding: 13px 0;
    position: fixed;
    width: 100vw;
    z-index: 90;
  }

  .formBackground {
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

// CODE
function CreatePage() {
  const dispatch = useDispatch();

  // component예시: { formType: 'multipleChoiceType', title: '~~', options: [ {text: '~~'}, { text: '~~'} ] }
  const components = useSelector(state => state.form.components);

  //form추가버튼을 클릭했을 때 (단답형, 장문형, 객관식 등의 버튼)
  // const addComponentHandler = useCallback(
  //   event => {
  //     const formType = event.target.value; //버튼 눌렀을 때 그 버튼이 가진 value속성의 값.
  //     setComponents([
  //       ...components,
  //       //배열 안의 객체 요소.
  //       {
  //         id: componentId.current,
  //         formType: formType,
  //         title: '',
  //       },
  //     ]);
  //     componentId.current++;
  //   },
  //   [components]
  // );
  // 리덕스툴킷으로 변경된 후
  const addComponentHandler = event => {
    const formType = event.target.value;
    dispatch(formActions.addComponent(formType));
  };

  // 최종으로 '저장'버튼을 눌렀을 때 실행 (db에 저장됨)
  const saveFormHandler = () => {
    // data변수에 최종 저장해야할 값들 정리해보기.
    const data = {
      saveDate: new Date().toISOString(),
      items: components,
    };
    console.log(data);
    console.log(components);
    dispatch(sendFormData(data));
  };

  return (
    <Section>
      <div className="controls controls__form-type">
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
                <ShortAnswerType index={idx} value={component} />
              ) : component.formType === 'longAnswerType' ? (
                <LongAnswerType index={idx} value={component} />
              ) : component.formType === 'multipleChoiceImageType' ? (
                <MultipleChoiceImageType index={idx} value={component} />
              ) : component.formType === 'multipleChoiceTextType' ? (
                <MultipleChoiceTextType index={idx} value={component} />
              ) : component.formType === 'ratingType' ? (
                <RatingType index={idx} value={component} />
              ) : null // 기본값이나 오류 처리를 위한 값 설정
            }
          </Fragment>
        ))}
      </div>

      <div className="controls controls__submit">
        <Button onClick={saveFormHandler}>저장</Button>
      </div>
    </Section>
  );
}

export default CreatePage;
