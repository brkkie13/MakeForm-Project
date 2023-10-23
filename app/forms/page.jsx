'use client';
import styled from 'styled-components';

// components
import FormsSearch from '../../components/forms/FormsSearch';
import FormsList from '../../components/forms/FormsList';
import Notification from '../../components/ui/Notification';

// redux
import { useSelector } from 'react-redux';

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
  const notification = useSelector(state => state.ui.notification);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      )}
      <Section>
        <h1>최근 폼</h1>
        <FormsSearch />
        <FormsList />
      </Section>
    </>
  );
}

export default FormsPage;
