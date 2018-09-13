module.exports = (api) => {
  const production = api.env.trim() == 'production';

  return {
    map: !production ? 'inline' : false,
    plugins: {
      'postcss-import': {},
      'precss': {},
      'css-mqpacker': production ? {} : false,
      'autoprefixer': production ? {} : false,
      'cssnano': production ? {} : false
    }
  };
};
