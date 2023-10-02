'use client';

import { useDispatch } from 'react-redux';
import { fetchFormData } from '@/redux/actions';

function MyFormPage() {
  const dispatch = useDispatch();
  const formData = dispatch(fetchFormData());
  console.log(formData);

  return (
    <>
      <h1>나의 폼 페이지</h1>
    </>
  );
}

export default MyFormPage;
