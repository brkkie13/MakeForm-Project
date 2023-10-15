'use client';
import styled from 'styled-components';
import { Fragment } from 'react';

// components
import Button from '../../components/ui/Button';
import ShortAnswerType from '../../components/form-types/ShortAnswerType';
import LongAnswerType from '../../components/form-types/LongAnswerType';
import MultipleChoiceImageType from '../../components/form-types/MultipleChoiceImageType';
import MultipleChoiceTextType from '../../components/form-types/MultipleChoiceTextType';
import RatingType from '../../components/form-types/RatingType';
import HeaderType from '../../components/form-types/HeaderType';
import DescriptionType from '../../components/form-types/DescriptionType';

// redux
import { sendFormData } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// css
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

// code
function CreatePage() {
  const dispatch = useDispatch();

  // component 예시:
  // { formType: 'multipleChoiceType', id: 0, title: '~~', options: [ {text: '~~'}, { text: '~~'} ] }
  const components = useSelector(state => state.form.components);
  const header = useSelector(state => state.form.header);

  const addComponentHandler = event => {
    const formType = event.target.value;
    dispatch(formActions.addComponent(formType));
  };

  // 최종으로 '저장'버튼을 눌렀을 때 실행 (db에 저장됨)
  const saveFormHandler = () => {
    const data = {
      creationDate: new Date().toISOString(),
      header: header,
      items: components,
    };
    console.log(data);
    dispatch(sendFormData(data));
    dispatch(formActions.resetAllValue());
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
        <Button onClick={addComponentHandler} value="descriptionType">
          + 설명 추가
        </Button>
      </div>

      <div className="formBackground">
        <header>
          <HeaderType />
        </header>
        {components.map((component, idx) => (
          <Fragment key={component.id}>
            {
              component.formType === 'shortAnswerType' ? (
                <ShortAnswerType index={idx} />
              ) : component.formType === 'longAnswerType' ? (
                <LongAnswerType index={idx} />
              ) : component.formType === 'multipleChoiceImageType' ? (
                <MultipleChoiceImageType index={idx} />
              ) : component.formType === 'multipleChoiceTextType' ? (
                <MultipleChoiceTextType index={idx} />
              ) : component.formType === 'ratingType' ? (
                <RatingType index={idx} />
              ) : component.formType === 'descriptionType' ? (
                <DescriptionType index={idx} />
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
