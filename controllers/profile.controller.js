const getProfile = async (req, res) => {
  return res.status(200).send({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role,
    },
  });
};
module.exports = {
  getProfile,
};
