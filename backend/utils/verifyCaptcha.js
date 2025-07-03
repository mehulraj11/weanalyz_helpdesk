const axios = require("axios");

const verifyCaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );
    return res.data.success;
  } catch (error) {
    console.error("Captcha verification failed:", error.message);
    return false;
  }
};

module.exports = verifyCaptcha;
