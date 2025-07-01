module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@images': 'C:/Users/felip/Desktop/Filhub-NPI/backend/storage/app/storage/images',
          },
        },
      ],
    ],
  };
};
