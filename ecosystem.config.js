module.exports = {
  apps: [
    {
      name: 'Talkware - Server',
      script: './dist/server.js',
      instances: 'max',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
