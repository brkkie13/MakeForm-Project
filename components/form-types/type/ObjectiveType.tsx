'use client';
import { RemoveBadge } from '@/public/svgs/Icons';
import { FormTitleInput } from '@components/ui/FormInputs';

import ObjectiveTypeOption from '@components/form-types/ObjectiveTypeOption';
import { ObjectiveTypeOptionsWrapper } from '@components/form-types/ObjectiveTypeOption.styles';
import { RoundedButtonStyled } from '@components/ui/Buttons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '@/stores/store';
import { formActions } from '@stores/features/formSlice';

// types
import { FormState, Option } from '@/types/types';

type Props = {
  index: number;
  isEdit: boolean;
};

// code
function ObjectiveType({ index, isEdit }: Props) {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const components = useSelector((state: FormState) => state.form.components);
  const options = components[index].options;
  // const options = components[index]?.options;

  const editItems = useSelector((state: FormState) => state.form.editItems);
  let editItemOptions;
  let lastOptionId: number;

  if (editItems.length > 0) {
    editItemOptions = editItems[index].options;
    if (editItemOptions) {
      // options배열에서 마지막 옵션 id를 추출해 옵션추가시 +1씩 증가시켜 옵션 id를 설정.
      lastOptionId = editItemOptions[editItemOptions.length - 1].id;
    }
  }

  const addOptionHandler = () => {
    // edit모드일 때만 옵션 추가 시 lastOptionId +1씩 증가시킴.
    isEdit && lastOptionId++;
    dispatch(
      formActions.addOption(
        isEdit
          ? { index, lastOptionId, isEdit: true }
          : { index, isEdit: false }
      )
    );
  };

  const removeOptionHandler = (optionId: number) => {
    dispatch(formActions.removeOption({ index, optionId, isEdit: isEdit }));
  };

  const changeTitleHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.currentTarget.value;
    dispatch(formActions.changeTitle({ index, newValue, isEdit: isEdit }));
  };

  const changeOptionHandler = (
    optionId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    dispatch(
      formActions.changeOption({ index, optionId, newValue, isEdit: isEdit })
    );
  };

  // isEdit이 true(수정모드)라면 editItemOptions를 map메서드로 순회.
  const optionsToRender: Option[] = isEdit
    ? editItemOptions || []
    : options || [];

  return (
    <>
      <FormTitleInput
        value={isEdit ? editItems[index].title : components[index].title}
        onChange={changeTitleHandler}
        placeholder="질문 제목을 입력하세요"
      />

      <ObjectiveTypeOptionsWrapper>
        {optionsToRender.map((option: Option, idx: number) => (
          <div className="option" key={option.id}>
            {/* 처음 두개옵션은 x표시 안뜨게 함. index가 2인 옵션부터 x표시 렌더링 */}
            {idx > 1 && (
              <RemoveBadge onClick={() => removeOptionHandler(option.id)} />
            )}
            <ObjectiveTypeOption
              value={option.text}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                changeOptionHandler(option.id, event)
              }
            />
          </div>
        ))}
      </ObjectiveTypeOptionsWrapper>
      <RoundedButtonStyled onClick={addOptionHandler}>
        + 옵션 추가
      </RoundedButtonStyled>
    </>
  );
}

export default ObjectiveType;
