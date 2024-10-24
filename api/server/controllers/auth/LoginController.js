const { setAuthTokens } = require('~/server/services/AuthService');
const { logger } = require('~/config');

const loginController = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verificar si el correo del usuario está verificado
    if (!req.user.emailVerified) {
      return res.status(409).json({ message: 'Please verify your email before logging in.' });
    }

    const { password: _, __v, ...user } = req.user;
    user.id = user._id.toString();

    const token = await setAuthTokens(req.user._id, res);
    return res.status(200).send({ token, user });
  } catch (err) {
    logger.error('[loginController]', err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  loginController,
};
