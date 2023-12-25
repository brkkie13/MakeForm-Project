'use client';
import { MailIcon } from '@styles/Icons';
import {
  FooterContainer,
  FooterStyled,
} from '@components/layout/Footer.styles';
import { useDispatch } from 'react-redux';
import { copyToClipboard } from '@redux/actions/utilsActionCreators';

function Footer() {
  const dispatch = useDispatch();

  const copyToClipboardHandler = async () => {
    dispatch(copyToClipboard('brkkie15@gmail.com'));
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
