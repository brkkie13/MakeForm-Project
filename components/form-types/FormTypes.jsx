import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FormTypesStyled } from '@components/form-types/FormTypes.styles';

// components
import FormTypeCard from '@components/ui/FormTypeCard';
import HeaderType from '@components/form-types/HeaderType';
import ShortAnswerType from '@components/form-types/ShortAnswerType';
import LongAnswerType from '@components/form-types/LongAnswerType';
import MultipleChoiceImageType from '@components/form-types/MultipleChoiceImageType';
import MultipleChoiceTextType from '@components/form-types/MultipleChoiceTextType';
import RatingType from '@components/form-types/RatingType';
import DescriptionType from '@components/form-types/DescriptionType';

// redux
import { useDispatch } from 'react-redux';
import { formActions } from '@redux/features/formSlice';

// code
function FormTypes({ items, onRemoveFormType, isEdit }) {
  const dispatch = useDispatch();

  const dragDropHandler = results => {
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
      <FormTypeCard content={<HeaderType isEdit={isEdit} />} isHeader={true} />
      <DragDropContext onDragEnd={dragDropHandler}>
        <Droppable droppableId="ROOT" type="group">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items &&
                items.length > 0 &&
                items.map((item, idx) => (
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
                          onRemoveFormType={() => onRemoveFormType(idx)}
                          content={
                            item.formType === 'shortAnswerType' ? (
                              <ShortAnswerType index={idx} isEdit={isEdit} />
                            ) : item.formType === 'longAnswerType' ? (
                              <LongAnswerType index={idx} isEdit={isEdit} />
                            ) : item.formType === 'multipleChoiceImageType' ? (
                              <MultipleChoiceImageType
                                index={idx}
                                isEdit={isEdit}
                              />
                            ) : item.formType === 'multipleChoiceTextType' ? (
                              <MultipleChoiceTextType
                                index={idx}
                                isEdit={isEdit}
                              />
                            ) : item.formType === 'ratingType' ? (
                              <RatingType index={idx} isEdit={isEdit} />
                            ) : item.formType === 'descriptionType' ? (
                              <DescriptionType index={idx} isEdit={isEdit} />
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
