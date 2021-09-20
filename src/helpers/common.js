const nodemailer = require('nodemailer');
function main(name, email, id) {
  const transporter = nodemailer.createTransport({
    host: process.env.COFFEESHOP_HOST,
    port: process.env.COFFEESHOP_PORT,
    secure: process.env.COFFEESHOP_SECURE,
    auth: {
      user: `${process.env.EMAIL_MAILER}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
  transporter
    .sendMail({
      from: `"Circle"<${process.env.EMAIL_MAILER}>`,
      to: `${email}`,
      subject: 'Thank you for registering to Circle!',
      html: `<h style:'margin-left:auto; margin-right:auto'>Thank you ${name} for registering to Circle</h><p style:'margin-left:auto; margin-right:auto'>One more step to awesome riding experience!</p><button style:'margin-left:auto; margin-right:auto;outline:none;border-radius:3px; background: red;padding: 5px 10px'><a href='${process.env.TARGET_URL}/verification/${id}'>Click here to confirm your account!</a></button>`,
    })
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
module.exports = {
  main,
};
