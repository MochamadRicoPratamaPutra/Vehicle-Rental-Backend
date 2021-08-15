const nodemailer = require('nodemailer');
function main(email) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ricoxxx007@gmail.com',
      pass: 'cangcimeng007',
    },
  });
  transporter
    .sendMail({
      from: '"Blanja!"<ricoxxx007@gmail.com>',
      to: `${email}`,
      subject: 'Confirmation to change your password',
      html: `<h style:'margin-left:auto; margin-right:auto'>Click button below to change your password</h>
        <button style:'margin-left:auto; margin-right:auto;outline:none;border-radius:3px; background: red;padding: 5px 10px'>
        <a href='http://localhost:3000/new-password/${email}'>Click here to confirm your account!</a>
        </button>`,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
module.exports = {
  main,
};
