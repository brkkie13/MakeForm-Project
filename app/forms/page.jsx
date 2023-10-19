'use client';
import styled from 'styled-components';

// components
import FormsList from '../../components/forms/FormsList';

// css
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  h1 {
    font-size: 18px;
    margin: 0;
    width: 80%;
    margin-bottom: 30px;
  }
`;

// code
function FormsPage() {
  return (
    <Section>
      <h1>최근 폼</h1>
      <FormsList />
    </Section>
  );
}

export default FormsPage;
