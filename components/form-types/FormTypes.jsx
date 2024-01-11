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
                            item.formType === 'subjectiveType' ? (
                              <SubjectiveType index={idx} isEdit={isEdit} />
                            ) : item.formType === 'objectiveType' ? (
                              <ObjectiveType index={idx} isEdit={isEdit} />
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
