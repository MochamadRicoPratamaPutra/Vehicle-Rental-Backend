const nodemailer = require('nodemailer');
function main(name, email, id) {
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
      subject: 'Thank you for registering to Blanja!',
      html: `<h style:'margin-left:auto; margin-right:auto'>Thank you ${name} for registering to Blanja!</h><p style:'margin-left:auto; margin-right:auto'>One more step to awesome shopping experience!</p><button style:'margin-left:auto; margin-right:auto;outline:none;border-radius:3px; background: red;padding: 5px 10px'><a href='http://localhost:3000/verification/${id}'>Click here to confirm your account!</a></button>`,
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
