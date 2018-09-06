module.exports = (api) => {
  return {
    map: true,
    plugins: {
      'postcss-import': {},
      'precss': {},
      'autoprefixer': {},
      'cssnano': {}
    }
  };
};
