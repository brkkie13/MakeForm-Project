'use client';

const colors = {
  white: 'white',
  black: 'black',
  lightgray: '#f6f6f6',
  lightgray2: '#efefef',
  lightgray3: '#e4e4e4',
  gray: '#b3b3b3',

  darkBlack: '#111315',
  darkBlack2: '#1F2124',
  darkBlack3: '#292B2F',

  skyblue: '#0099EF',
  skyblue2: '#0062d3',

  red: '#F44336',
};

export const lightTheme = {
  colors: {
    font: colors.black,
    background: colors.white,
    background2: colors.lightgray,
    block: colors.white,

    hoverMenu: colors.lightgray2,
    activeMenu: colors.lightgray3,
    input: colors.white,
    border: colors.lightgray3,

    pointSkyblue: colors.skyblue,
    pointSkyblue2: colors.skyblue2,
    pointRed: colors.red,
  },
};

export const darkTheme = {
  colors: {
    font: 'white',
    background: colors.darkBlack,
    background2: colors.darkBlack2,
    block: colors.darkBlack3,

    hoverMenu: colors.darkBlack2,
    activeMenu: colors.darkBlack2,
    input: colors.darkBlack2,
    border: 'none',

    pointSkyblue: colors.skyblue,
    pointSkyblue2: colors.skyblue2,
    pointRed: colors.red,
  },
};
