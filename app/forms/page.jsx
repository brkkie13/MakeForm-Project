'use client';
import styled from 'styled-components';

// components
import FormsList from '../../components/forms/FormsList';
import Modal from '../../components/Modals/Modal';
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
  // const isModalOpen = useSelector(state => state.ui.isModalOpen);
  return (
    <>
      {/* {isModalOpen && <Modal />} */}
      <Section>
        <h1>최근 폼</h1>
        <FormsList />
      </Section>
    </>
  );
}

export default FormsPage;
