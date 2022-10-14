module.exports = {
  apps: [
    {
      name: 'Talkware - Server',
      script: './dist/server.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
