'use client';
import { ToolbarStyled } from '@components/form-types/FormTypesToolbar.styles';
import { RoundedButtonStyled } from '@components/ui/Buttons';
import { FORM_TYPES } from '@utils/constants';

// code
function FormTypesToolbar({ onAddFormType }) {
  return (
    <ToolbarStyled>
      {Object.entries(FORM_TYPES).map(([key, value]) => (
        <RoundedButtonStyled
          onClick={e => onAddFormType(e.target.value)}
          value={key}
        >
          {value}
        </RoundedButtonStyled>
      ))}
    </ToolbarStyled>
  );
}

export default FormTypesToolbar;
