const jwt = require('jsonwebtoken');

const generateToken = (res, userId) =>{
    try{
        if (!userId) {
            throw new Error('userId is required for token generation.');
          }

          if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not defined.');
          }

          const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '30d',
          });

          res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'user-development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          });
    } catch (error) {
        console.error('Error generating token:', error.message);
        res.status(500).json({ error: 'Token generation failed' });
           throw error;
    }
};

module.exports = generateToken;