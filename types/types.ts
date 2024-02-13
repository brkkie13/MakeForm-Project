import React from 'react';
import { AuthInitialState } from '@/stores/features/authSlice';
import { FormInitialState } from '@/stores/features/formSlice';
import { ResponsesInitialState } from '@/stores/features/responsesSlice';
import { UiInitialState } from '@/stores/features/uiSlice';

// html 태그에 대한 props
export type SvgProps = React.SVGProps<SVGElement>;
export type SpanProps = React.HTMLAttributes<HTMLSpanElement>;

// 리덕스 툴킷-----------------------
// stores/features/formSlice.ts에서 initialState를 사용하는 곳에서 import!
export interface FormState {
  form: FormInitialState;
}

// stores/features/responsesSlice.ts
export interface ResponsesState {
  responses: ResponsesInitialState;
}

export interface UiState {
  ui: UiInitialState;
}

export interface AuthState {
  auth: AuthInitialState;
}
// 리덕스 툴킷 끝-----------------------

export type FormType =
  | 'subjectiveType'
  | 'objectiveType'
  | 'ratingType'
  | 'descriptionType';

export type Option = {
  id: number;
  text: string;
};

export type Item = {
  id: number;
  formType: FormType;
  title?: string;
  options?: Option[];
  description?: string;
};
// app/create/page.tsx/saveFormHandler
// db에 전송할 기본 데이터
export type InitialCreatedData = {
  creationDate: Date;
  header: string;
  items: Item[];
};

// 로그인하면 userId필드 추가 or 로그인 안하면 id필드 추가(localData0, 1 ...)
export interface CreatedData extends InitialCreatedData {
  id?: string; // firebase 문서 아이디
  userId?: string; // firebase 유저 아이디
  formId?: string; // 얘가 원래는 없는데 Response와 똑같이 formId가 있도록 통일해야 함.
}

// 공통사용되는곳:
// app/[formId]/page.tsx -> sharedForm
// sharedForm 또는 formDetail 또는 responsesDetail
export type FormDetail = {
  id: string;
  userId: string;
  header: string;
  items?: Item[];
  responses?: (ResponseItemWithTitle | ResponseItemWithDescription)[];
};

// Response 관련 타입-----------------------------
// app/components/ui/Detail.tsx, formResponseActionCreators.ts
export type SubmittedResponse = {
  formId: string;
  header: string;
  submissionDate: Date;
  responses: (ResponseItemWithTitle | ResponseItemWithDescription)[];
  userId: string;
};

export interface SavedResponse {
  formId: string;
  header: string;
  submissionDate: Date;
  responsesList: {
    id: string;
    responses: (ResponseItemWithTitle | ResponseItemWithDescription)[];
    submissionDate: Date;
  }[];
  userId: string;
  docId: string;
}

export type ResponsesListItem = {
  id: string;
  responses: (ResponseItemWithTitle | ResponseItemWithDescription)[];
  submissionDate: Date;
};
// app/analysis/[responsesId]/page.tsx
// 형태가 FormDetail과 비슷해서 리팩토링 필요.
export interface Response {
  formId: string;
  id: string;
  docId: string;
  userId: string;
  header: string;
  responses: (ResponseItemWithTitle | ResponseItemWithDescription)[];
  submissionDate: Date;
}

export type ResponseItem = {
  formType: FormType;
};

export interface ResponseItemWithTitle extends ResponseItem {
  title: string;
  response: string;
}

export interface ResponseItemWithDescription extends ResponseItem {
  description: string;
}

// AuthForm.tsx / AuthInput.tsx에도 사용.
export type UserInput = {
  value: string;
  isValid: boolean;
  isTouched: boolean;
};

// useQueryString.ts, useFilters.ts
export type QueryString = {
  year: string | null;
  month: string | null;
  searchWord: string | null;
  page: string | null;
};
export type SetQueryString = React.Dispatch<React.SetStateAction<QueryString>>;

// useFilters.ts
export type FilterAction = {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  defaultValue: string;
};

export type FilterActions = {
  [K in 'year' | 'month' | 'searchWord' | 'formId']: FilterAction;
};

// Filters.tsx
export type TitleOptions = ('전체 폼' | Response)[];

// Navbar.tsx

export type DropdownMenuList = {
  id: number;
  text: string;
  onClick: () => void;
}[];

export type CarouselItemType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

// app/forms/[formId]/edit/page.tsx
export type EditedData = {
  header: string;
  items: Item[];
};

// formActionCreators.ts -> fetchFormDataWithFormId함수
export type FetchedFormDataWithFormId = {
  id: string;
  header: string;
  items: Item[];
  userId: string;
};

// utils/localStorage.ts
// 로그인 안하고 폼 생성했을 때 로컬스토리지에 저장되는 데이터배열의 요소의 타입.
export type LocalStorageData = {
  id: string;
  header: string;
  items: Item[];
  creationDate: Date;
};
