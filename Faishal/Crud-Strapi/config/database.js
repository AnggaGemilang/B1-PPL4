module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', '103.157.96.115'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'db_alysida'),
        username: env('DATABASE_USERNAME', 'alysida'),
        password: env('DATABASE_PASSWORD', 'andromeda'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
