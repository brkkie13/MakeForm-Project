'use client';
import { MailIcon } from '@/public/svgs/Icons';
import {
  FooterContainer,
  FooterStyled,
} from '@components/layout/Footer.styles';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@/stores/store';
import { copyToClipboard } from '@stores/actions/utilsActionCreators';

// code
function Footer() {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const copyToClipboardHandler = async () => {
    dispatch(copyToClipboard('brkkie15@gmail.com', '이메일이 복사되었습니다.'));
  };

  return (
    <FooterContainer>
      <FooterStyled>
        <div>© Bora Lee. All rights reserved.</div>
        <div className="email" onClick={copyToClipboardHandler}>
          <MailIcon />
          Click me!
        </div>
      </FooterStyled>
    </FooterContainer>
  );
}

export default Footer;
