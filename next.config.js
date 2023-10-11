// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

// -----------------------------
// module.exports = {
//   reactStrictMode: false,
//   webpack5: true,
//   webpack: config => {
//     config.resolve.fallback = { fs: false };

//     return config;
//   },
// };
// -----------------------------

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: false,

  // 에러 해결 위해서 아래 코드 추가.
  // error message : Disabled SWC as replacement for Babel because of custom Babel configuration ".babelrc"
  // 참고자료: https://nextjs.org/docs/messages/swc-disabled
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: config => {
    config.resolve.fallback = { fs: false };
    return config;
  },

  // styled components 에러 해결 코드 추가
  // error message : Prop `className` did not match
  // 참고자료: https://tesseractjh.tistory.com/164
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
