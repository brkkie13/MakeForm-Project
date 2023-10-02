'use client';

const colors = {
  white: '#fff',
  lightgray: '#f6f6f6',
  lightgray2: '#efefef',
  lightgray3: '#e4e4e4',
  gray: '#b3b3b3',

  darkBlack: '#111315',
  darkBlack2: '#1F2124',
};

export const lightTheme = {
  colors: {
    background: colors.white,
    background2: colors.lightgray,

    hoverMenu: colors.lightgray2,
    activeMenu: colors.lightgray3,

    input: colors.white,

    border: colors.lightgray3,
  },

  pointColors: {},
};

export const darkTheme = {
  colors: {
    background: colors.darkBlack,
    background2: colors.darkBlack2,
  },
};
