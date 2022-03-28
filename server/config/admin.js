module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6b84ce54d7ccd03a63fcccf02d6faf27'),
  },
});
