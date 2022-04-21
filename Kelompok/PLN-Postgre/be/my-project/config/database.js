const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'db_pln'),
      user: env('DATABASE_USERNAME', 'postgres'),
<<<<<<< HEAD
      password: env('DATABASE_PASSWORD', 'virgo2'),
=======
      password: env('DATABASE_PASSWORD', 'irfannoor123'),
>>>>>>> e4b48e135cd59c627fb0bb3012c4be8b450a0651
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});