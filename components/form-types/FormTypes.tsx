import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FormTypesStyled } from '@components/form-types/FormTypes.styles';

// components
import FormTypeCard from '@components/form-types/FormTypeCard';
import HeaderType from '@components/form-types/type/HeaderType';
import SubjectiveType from '@components/form-types/type/SubjectiveType';
import ObjectiveType from '@components/form-types/type/ObjectiveType';
import RatingType from '@components/form-types/type/RatingType';
import DescriptionType from '@components/form-types/type/DescriptionType';

// redux
import { useDispatch } from 'react-redux';
import { formActions } from '@stores/features/formSlice';

// types
import { Item } from '@/types/types';

interface Props {
  items: Item[];
  onRemoveFormType: (id: number) => void;
  isEdit?: boolean;
}

// code
function FormTypes({ items, onRemoveFormType, isEdit }: Props) {
  const dispatch = useDispatch();

  // results에 대한 타입은 라이브러리 소스 참고할 것.
  const dragDropHandler = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === 'group') {
      if (isEdit) {
        dispatch(
          formActions.reorderEditItems({
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })
        );
      } else {
        dispatch(
          formActions.reorderComponents({
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })
        );
      }
    }
  };

  return (
    <FormTypesStyled>
      <FormTypeCard
        content={<HeaderType isEdit={isEdit ? true : false} />}
        isHeader={true}
      />
      <DragDropContext onDragEnd={dragDropHandler}>
        <Droppable droppableId="ROOT" type="group">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items &&
                items.length > 0 &&
                items.map((item: Item, idx: number) => (
                  <Draggable
                    // draggableId는 반드시 문자열이어야 한다.
                    draggableId={String(item.id)}
                    key={item.id}
                    index={idx}
                  >
                    {provided => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <FormTypeCard
                          id={idx}
                          onRemoveFormType={onRemoveFormType}
                          content={
                            item.formType === 'subjectiveType' ? (
                              <SubjectiveType
                                index={idx}
                                isEdit={isEdit ? true : false}
                              />
                            ) : item.formType === 'objectiveType' ? (
                              <ObjectiveType
                                index={idx}
                                isEdit={isEdit ? true : false}
                              />
                            ) : item.formType === 'ratingType' ? (
                              <RatingType
                                index={idx}
                                isEdit={isEdit ? true : false}
                              />
                            ) : item.formType === 'descriptionType' ? (
                              <DescriptionType
                                index={idx}
                                isEdit={isEdit ? true : false}
                              />
                            ) : null
                          }
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </FormTypesStyled>
  );
}

export default FormTypes;
