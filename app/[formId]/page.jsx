'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import FormDetail from '@components/forms/FormDetail';
import { Section, SectionCard } from '@components/ui/Section';

// redux
import { useDispatch } from 'react-redux';
import { fetchFormDataWithFormId } from '@stores/actions/formActionCreators';
import NotificationBanner from '@/components/ui/NotificationBanner';
import { CautionIcon } from '@/components/assets/Icons';

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

  // form id가 유효하지 않거나 localData로 시작할 때(로그인을 안하고 작성해서 브라우저에 임시로 저장된 게시물) 접근 불가
  if (formId.startsWith('localData') || !form) {
    return (
      <Section>
        <SectionCard>
          <NotificationBanner
            icon={<CautionIcon />}
            mainText={'존재하지 않는 폼 입니다.'}
            subText={'올바른 주소로 접근해주세요.'}
          />
        </SectionCard>
      </Section>
    );
  }

  return (
    <Section>
      <SectionCard>
        <FormDetail sharedForm={form} />
      </SectionCard>
    </Section>
  );
}

export default SharedFormDetailPage;
