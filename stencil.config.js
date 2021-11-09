exports.config = {
  srcDir: 'src/app',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www'
    }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
