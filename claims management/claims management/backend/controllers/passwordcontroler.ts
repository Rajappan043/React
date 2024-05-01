import nodemailer from "nodemailer";
interface EmailResponse {
  message: string;
  status: boolean;
}

const forgetPasswordService = async (email:string,status:string,id:any,date:string):Promise<EmailResponse> => {
  try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:'fundapp.nexi@gmail.com',
          pass: 'cgrt wsfd akuu addj'
        }
      });

      const mailOptions = {
        from: 'noReplay.nexi@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: ` your Insurance claim id ${id} at Date ${date} has been ${status}`
      };

      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error:any) => {
          if (!error) {
            resolve({ message: "email sent", status: true });
          } else {
            reject({ message: "error sending email", status: false });
          }
        });
      });
  } catch (error:any) {
    return { message: error.message, status: false };
  }
};

export { forgetPasswordService };
