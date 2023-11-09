'use client';

import { useEffect, useState, useCallback, Fragment } from 'react';
import { useRouter, useParams } from 'next/navigation';

// components
import Button from '../../../components/ui/Button';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData } from '../../../redux/actions';

// code
function FormDetailPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const formId = params.formId;

  const formList = useSelector(state => state.form.formList);
  const [form, setForm] = useState({});

  useEffect(() => {
    dispatch(fetchFormData());
  }, []);

  useEffect(() => {
    if (formList.length > 0) {
      const targetedForm = formList.find(form => form.id === formId);
      targetedForm ? setForm(targetedForm) : router.push('/forms');
    }
  }, [formList]);

  const onEditHandler = useCallback(() => {
    const editPagePath = `/forms/${formId}/edit`;
    router.push(editPagePath);
  }, []);

  // console.log('formId', formId);
  // console.log('formList', formList);
  // console.log('form', form);

  return (
    <section>
      <section>
        <h1>{form.header}</h1>
        <div>
          {form.items?.map(item => (
            <Fragment key={item.id}>
              <h2>{item.title}</h2>
              <div>{item?.description}</div>
              <div>
                {item.options?.map(option => (
                  <div key={option.id}>{option.text}</div>
                ))}
              </div>
            </Fragment>
          ))}
        </div>
      </section>
      <div className="controls">
        <Button onClick={onEditHandler}>수정</Button>
        <Button>삭제</Button>
      </div>
    </section>
  );
}

export default FormDetailPage;
