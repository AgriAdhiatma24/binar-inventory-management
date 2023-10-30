const { userProfile, resetPassword, user } = require("../models");
const { errorResp, okResp } = require("../utils/responseHandlers");
const crypto = require('crypto');


const generateToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
  
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
  
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 15);
  
    return { token, expiration };
  };
  



const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const userProfileData = await userProfile.getUserProfileByEmail(email);

    if (!userProfileData || !userProfileData.user_id) {
        
        return res.status(404).json(errorResp("User not found"));
    }

    const userId = userProfileData.user_id;

    const { token, expiration } = generateToken(); 
    try {
        await resetPassword.storeToken(userId, token, expiration); 
        await resetPassword.sendPasswordResetEmail(email, token)
        return res
            .status(200)
            .json(okResp("A reset token has been sent to your email"));
        
    } catch (e) {
        console.error("Error sending token", e);
        return res.status(e.code || 500).json(errorResp(e.message));
    }
}


const resetUserPassword = async (req, res) => {
    const token = req.body.token;
    const userId = req.params.userId;
    const newPassword = req.body.password;

    try {
        const tokenVerification = await resetPassword.getTokenByUserId(userId);

        if (!tokenVerification || token !== tokenVerification.token || tokenVerification.status !== true) {
            console.error("Invalid or expired token", tokenVerification);
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        console.log("Token verified:", tokenVerification);

        // Mark the token as used or invalid in the database
        await resetPassword.markTokenAsUsed(tokenVerification.id);

        console.log("Token marked as used");

        // Reset the user's password
        await user.updateUserPassword(userId, newPassword);

        console.log("Password updated");

        return res.status(200).json(okResp("User Password Updated Successfully"));
    } catch (e) {
        console.error("Error updating user password: ", e);
        return res.status(e.code || 500).json(errorResp(e.message));
    }
};

module.exports = {
    forgotPassword,
    resetUserPassword
}















  