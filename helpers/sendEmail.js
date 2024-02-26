import sendgrid from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
const { SENDGRID_API_KEY } = process.env; // Из файла .env

sendgrid.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = {
    ...data, 
    from: "sergiibort@gmail.com",
  };
  await sendgrid.send(email)
    .then(() => console.log("Email send SUCCESS"))
    .catch((error) => console.log(error.message));
};

export { sendEmail };
