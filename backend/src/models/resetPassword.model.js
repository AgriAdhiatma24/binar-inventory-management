const db = require("../db/db.config");
const { ErrorServer, ErrorNotFound } = require("../utils/errorHandlers");
const nodemailer = require('nodemailer');
const uuid = require('uuid');

const storeToken = async (userId, token, expiration) => {
    try {

        await db('password_reset_token')
            .where({ user_id: userId })
            .del();

      
        await db('password_reset_token')
            .insert({
                id: uuid.v4(),
                user_id: userId,
                token,
                expiration
            });

        return true; 
    } catch (e) {
        throw new ErrorServer(e.detail);
    }
}


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, 
  secure: false, 
  auth: {
    user: "managementinventory8@gmail.com", 
    pass: "wyxy atpl jsnb xrkg", 
  },
});

const sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: 'managementinventory8@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `A password reset was requested for your account and your password reset code is ${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
}


const getTokenByUserId = async (userId) => {
    try {
        const [tokenData] = await db('password_reset_token')
            .select('*')
            .where('user_id', userId)

        if (!tokenData) {
            return null;
        }

        const currentTimestamp = new Date();
        if (currentTimestamp > tokenData.token_expiration) {
            return null;
        }

        return tokenData;
    } catch (e) {
        throw new ErrorServer(e.detail);
    }
};

  

module.exports = { 
    storeToken,
    sendPasswordResetEmail,
    getTokenByUserId,
 }
