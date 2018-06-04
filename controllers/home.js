/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (req.user) {
    return res.redirect('/index.html');
  }
  return res.redirect('/login');
};
