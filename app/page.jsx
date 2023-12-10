'use client';
import FormSummaryCard from '../components/ui/FormSummaryCard';
import Section from '../components/ui/Section';

function HomePage() {
  return (
    <Section>
      <div className="cards">
        <FormSummaryCard title="새로 접수된 폼" badge="미확인" countNum="1" />
        <FormSummaryCard title="오늘 접수된 폼" badge="09.21" countNum="23" />
        <FormSummaryCard title="이번 달 통계" badge="2023.09" countNum="427" />
        <FormSummaryCard title="지난 달 통계" badge="2023.08" countNum="427" />
      </div>
    </Section>
  );
}

export default HomePage;
