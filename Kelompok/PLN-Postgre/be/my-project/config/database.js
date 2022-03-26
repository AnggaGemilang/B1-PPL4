const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'db_pln'),
      user: env('DATABASE_USERNAME', 'postgres_pln'),
      password: env('DATABASE_PASSWORD', 'postgres_pln'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
