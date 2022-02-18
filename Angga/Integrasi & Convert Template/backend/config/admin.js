module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'aa8717ae9280dc7058e8cb0415c52283'),
  },
});
