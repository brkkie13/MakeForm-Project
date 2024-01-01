'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import FormDetail from '@components/forms/FormDetail';
import { Section, SectionCard } from '@components/ui/Section';

// redux
import { useDispatch } from 'react-redux';
import { fetchFormDataWithFormId } from '@stores/actions/formActionCreators';

// code
function SharedFormDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const formId = params.formId;
  const [form, setForm] = useState({});

  useEffect(() => {
    dispatch(fetchFormDataWithFormId(formId)).then(formData =>
      setForm(formData)
    );
  }, [dispatch, formId]);

  return (
    <Section>
      <SectionCard>
        <FormDetail sharedForm={form} />
      </SectionCard>
    </Section>
  );
}

export default SharedFormDetailPage;
