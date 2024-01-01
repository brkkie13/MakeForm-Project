import { NotificationBannerStyled } from './NotificationBanner.styles';

function NotificationBanner({ icon, mainText, subText }) {
  return (
    <NotificationBannerStyled>
      {icon}
      <div className="main-text">{mainText}</div>
      <div className="sub-text">{subText}</div>
    </NotificationBannerStyled>
  );
}

export default NotificationBanner;
