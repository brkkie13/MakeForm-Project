import { FormTypesStyled } from './FormTypes.styles';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// components
import HeaderType from './HeaderType';
import FormTypeCard from '../ui/FormTypeCard';
import ShortAnswerType from './ShortAnswerType';
import LongAnswerType from './LongAnswerType';
import MultipleChoiceImageType from './MultipleChoiceImageType';
import MultipleChoiceTextType from './MultipleChoiceTextType';
import RatingType from './RatingType';
import DescriptionType from './DescriptionType';
import { useDispatch } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// code
function FormTypes({ components, onRemoveFormType }) {
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
      dispatch(
        formActions.reorderComponent({
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    }
  };

  return (
    <FormTypesStyled>
      <FormTypeCard content={<HeaderType />} isHeader={true} />
      <DragDropContext onDragEnd={dragDropHandler}>
        <Droppable droppableId="ROOT" type="group">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {components.map((component, idx) => (
                <Draggable
                  // draggableId는 반드시 문자열이어야 한다.
                  draggableId={String(component.id)}
                  key={component.id}
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
                          component.formType === 'shortAnswerType' ? (
                            <ShortAnswerType index={idx} />
                          ) : component.formType === 'longAnswerType' ? (
                            <LongAnswerType index={idx} />
                          ) : component.formType ===
                            'multipleChoiceImageType' ? (
                            <MultipleChoiceImageType index={idx} />
                          ) : component.formType ===
                            'multipleChoiceTextType' ? (
                            <MultipleChoiceTextType index={idx} />
                          ) : component.formType === 'ratingType' ? (
                            <RatingType index={idx} />
                          ) : component.formType === 'descriptionType' ? (
                            <DescriptionType index={idx} />
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
