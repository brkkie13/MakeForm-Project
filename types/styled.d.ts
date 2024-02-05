import 'styled-components';

declare module 'styled-components' {
  export type Colors = {
    white: string;
    black: string;

    gray0: string;
    gray1: string;
    gray2: string;
    gray3: string;
    gray4: string;
    gray5: string;
    gray6: string;
    gray7: string;
    gray8: string;
    gray9: string;

    blue0: string;
    blue1: string;
    blueLight: string;
    blueDark: string;

    red: string;
    gold: string;
  };

  export type Radius = {
    small: string;
    medium: string;
    large: string;
    max: string;
  };

  export type ZIndex = {
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
    level6: string;
  };

  export type Width = {
    mobile: string;
    tablet: string;
  };

  export type Theme = {
    colorBackground0: string;
    colorBackground1: string;
    colorBackgroundReverse: string;

    colorWhiteOrBlack: string;
    colorBlackOrWhite: string;

    colorGrayLightest: string;
    colorGrayLight: string;
    colorGrayHeavy: string;
    colorGrayHeaviest: string;

    colorBlueBackground: string;
    colorBlue0: string;
    colorBlue1: string;
    colorRed: string;
    colorGold: string;

    shadow: string;

    radius: Radius;
    zIndex: ZIndex;
    width: Width;
  };
}
