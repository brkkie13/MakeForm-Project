'use client';
import { ToolbarStyled } from '@components/form-types/FormTypesToolbar.styles';
import { RoundedButtonStyled } from '@components/ui/Buttons';
import { FORM_TYPES } from '@utils/constants';
import React, { HTMLAttributes } from 'react';

type Props = {
  // onAddFormType: (e:React.MouseEvent<HTMLButtonElement>) => void;
  onAddFormType: (formType: string) => void;
};

// code
// 부모 컴포넌트: app/create/page.tsx
function FormTypesToolbar({ onAddFormType }: Props) {
  return (
    <ToolbarStyled>
      {Object.entries(FORM_TYPES).map(([key, value], idx) => (
        <RoundedButtonStyled
          key={idx}
          onClick={e => onAddFormType((e.target as HTMLButtonElement).value)}
          value={key}
        >
          {value}
        </RoundedButtonStyled>
      ))}
    </ToolbarStyled>
  );
}

export default FormTypesToolbar;
