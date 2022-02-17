module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f65a19d491fa483e36b0022fd4768725'),
  },
});
