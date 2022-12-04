// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: 'Talkware - Server',
      script: './dist/server.js',
      out_file: '/tmp/Talkware.log',
      log_date_format: 'MM/DD/YYYY HH:mm:ss',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
