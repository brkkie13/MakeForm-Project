'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Section, SectionCard } from '@components/ui/Section';
import Detail from '@components/ui/Detail';
import { InvalidUrlBanner } from '@components/ui/NotificationBanner';

// redux
import { useDispatch } from 'react-redux';
import { fetchFormDataWithFormId } from '@stores/actions/formActionCreators';

// code
function SharedFormDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const formId = params.formId;
  const [form, setForm] = useState();

  useEffect(() => {
    dispatch(fetchFormDataWithFormId(formId)).then(formData =>
      setForm(formData)
    );
  }, [dispatch, formId]);

  return (
    <Section>
      <SectionCard>
        {/* localData는 로그인을 하지 않고 생성된 폼이므로 접근 불가 */}
        {formId.startsWith('localData') || !form ? (
          <InvalidUrlBanner />
        ) : (
          <Detail sharedForm={form} />
        )}
      </SectionCard>
    </Section>
  );
}

export default SharedFormDetailPage;
