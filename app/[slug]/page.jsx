'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import FormDetail from '@components/forms/FormDetail';
import { Section, SectionCard } from '@components/ui/Section';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData } from '@stores/actions/formActionCreators';

// code
function SharedFormDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const formId = params.slug;
  const formList = useSelector(state => state.form.formList);
  const [form, setForm] = useState({});

  useEffect(() => {
    dispatch(fetchFormData());
  }, [dispatch, formId]);

  useEffect(() => {
    if (formList.length > 0) {
      const targetedForm = formList.find(form => form.id === formId);
      targetedForm && setForm(targetedForm);
    }
  }, [formList, dispatch, formId]);

  return (
    <Section>
      <SectionCard>
        <FormDetail sharedForm={form} />
      </SectionCard>
    </Section>
  );
}

export default SharedFormDetailPage;
