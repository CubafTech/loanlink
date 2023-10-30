import nodemailer from "nodemailer";
class Email {
  constructor(user, url) {
    this.to = user.email;
    this.from = "olayemiayomide642@gmail.com";
    this.url = url;
  }
  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS,
      },
      secure: true,
    });
  }
  async send(template, subject) {
    const mailOptions = {
      to: this.to,
      from: this.from,
      subject: template,
      text: subject,
    };

    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send("welcome", "Welcome to this awesome website");
  }
  async resetPassword(message) {
    await this.send("password reset", message);
  }
  async sendEmailToken(message) {
    await this.send("Email Verification Token", message);
  }
}

export default Email;
