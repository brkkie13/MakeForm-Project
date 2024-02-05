import React from 'react';
import { NotificationBannerStyled } from './NotificationBanner.styles';
import { CautionIcon } from '@/public/svgs/Icons';

//types
type Props = {
  icon: React.ReactNode;
  mainText: string;
  subText?: string | React.ReactNode;
};

// code
export default function NotificationBanner({ icon, mainText, subText }: Props) {
  return (
    <NotificationBannerStyled>
      {icon}
      <div className="main-text">{mainText}</div>
      <div className="sub-text">{subText}</div>
    </NotificationBannerStyled>
  );
}

export function InvalidUrlBanner() {
  return (
    <NotificationBanner
      icon={<CautionIcon />}
      mainText={'유효하지 않은 주소입니다.'}
      subText={'올바른 주소로 접근해주세요.'}
    />
  );
}
