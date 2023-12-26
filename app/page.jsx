'use client';
import { Section } from '@components/ui/Section';
import SummaryCard from '@components/ui/SummaryCard';

function HomePage() {
  return (
    <Section>
      <div className="cards">
        <SummaryCard title="새로 접수된 폼" badge="미확인" countNum="1" />
        <SummaryCard title="오늘 접수된 폼" badge="09.21" countNum="23" />
        <SummaryCard title="이번 달 통계" badge="2023.09" countNum="427" />
        <SummaryCard title="지난 달 통계" badge="2023.08" countNum="427" />
      </div>
    </Section>
  );
}

export default HomePage;
