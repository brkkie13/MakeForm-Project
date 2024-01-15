'use client';

const colors = {
  white: '#FFFFFF',
  black: '#000000',

  gray0: '#F3F4F7',
  gray1: '#E4E5E8',
  gray2: '#CECFD5',
  gray3: '#B3B5B8',
  gray4: '#909194',
  gray5: '#646568',
  gray6: '#3F3F41',
  gray7: '#2D2E2F',
  gray8: '#1F2020',
  gray9: '#181819',

  blue0: '#0099EF',
  blue1: '#0062d3',
  blueLight: '#d9e9f3',
  blueDark: '#355990',

  red: '#F44336',
  gold: 'gold',
};

export const lightTheme = {
  colorBackground0: colors.white, // navbar
  colorBackground1: colors.gray0, // 배경색
  colorBackgroundReverse: colors.gray9, // tooltip

  colorWhiteOrBlack: colors.white,
  colorBlackOrWhite: colors.black,

  colorGrayLightest: colors.gray3,
  colorGrayLight: colors.gray4,
  colorGrayHeavy: colors.gray5,
  colorGrayHeaviest: colors.gray6,

  colorBlueBackground: colors.blueLight,
  colorBlue0: colors.blue0,
  colorBlue1: colors.blue1,
  colorRed: colors.red,
  colorGold: colors.gold,

  shadow: '0px 0px 20px rgba(8, 18, 69, 0.05)',

  radiusSmall: '7px',
  radiusMedium: '10px',
  radiusLarge: '15px',
  radiusMax: '100px',

  mobileWidth: '768px',
  tabletWidth: '1000px',
};

export const darkTheme = {
  colorBackground0: colors.gray9, // navbar
  colorBackground1: colors.gray8, // 배경색
  colorBackgroundReverse: colors.white, // tooltip

  colorWhiteOrBlack: colors.black,
  colorBlackOrWhite: colors.white,

  colorGrayLightest: colors.gray5,
  colorGrayLight: colors.gray4,
  colorGrayHeavy: colors.gray3,
  colorGrayHeaviest: colors.gray2,

  colorBlueBackground: colors.blueDark,
  colorBlue0: colors.blue0,
  colorBlue1: colors.blue1,
  colorRed: colors.red,
  colorGold: colors.gold,

  shadow: colors.gray1,

  radiusSmall: '7px',
  radiusMedium: '10px',
  radiusLarge: '15px',
  radiusMax: '100px',

  mobileWidth: '768px',
  tabletWidth: '1000px',
};
