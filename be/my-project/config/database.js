const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'ec2-23-20-224-166.compute-1.amazonaws.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'daooqgs6eqire4'),
      user: env('DATABASE_USERNAME', 'wwvjwynhvgaeoi'),
      password: env('DATABASE_PASSWORD', 'cf167aa0a7a1e7a2cadd44461cf38f6d3fea1a3dacd5a64ff0194a29ec64ad64'),
      ssl: { rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false)},
    },
  },
});