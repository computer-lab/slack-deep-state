module.exports = {
  apps : [
    {
      name      : 'deepstate',
      script    : 'bin/slack-deep-state.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ],
};
