import { NotificationBannerStyled } from './NotificationBanner.styles';
import { CautionIcon } from '@components/assets/Icons';

export default function NotificationBanner({ icon, mainText, subText }) {
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
