module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6ceff8ecd720dd20d8858678385df904'),
  },
});
