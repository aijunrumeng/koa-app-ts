module.exports = {
  apps: [
    {
      name: 'koa-app',
      script: './app.js',
      watch: true,
      ignore_watch: ['[/\\]./', 'node_modules', 'temp'],
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
