'use client';
import styled from 'styled-components';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData } from '../../redux/actions/formActionCreators';
import FormDetail from '../../components/forms/FormDetail';

const Section = styled.section`
  padding-top: 70px;
`;

function SharedFormDetailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
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
      <FormDetail sharedForm={form} />
    </Section>
  );
}

export default SharedFormDetailPage;
