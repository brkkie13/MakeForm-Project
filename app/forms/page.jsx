'use client';
import styled from 'styled-components';

// components
import FormsSearch from '../../components/forms/FormsSearch';
import FormsList from '../../components/forms/FormsList';

// css
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-top: 70px;
    margin-bottom: 20px;
  }
`;

// code
function FormsPage() {
  return (
    <Section>
      <h1>최근 폼</h1>
      <FormsSearch />
      <FormsList />
    </Section>
  );
}

export default FormsPage;
