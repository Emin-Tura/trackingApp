import tryCatch from "./utils/tryCatch.js";
import sendEmail from "./utils/sendEmail.js";

export const createMail = tryCatch(async (req, res) => {
  const { assigneeMail, task } = req.body;
  try {
    const send_to = assigneeMail;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = assigneeMail;
    const subject = "Yeni Bir Göreviniz Var...";
    const message = `
        <h4>Merhaba:</h4>
        <p>Yeni bir göreviniz var:</p>
        <p>${task}</p>
        <p>Saygılarımızla...</p>
        <footer>Cypoint Ekibi</footer>
        <br />
        <br />
        <img src="https://firebasestorage.googleapis.com/v0/b/cypointapp.appspot.com/o/profile%2F637b42329d5b09d01394e130%2F71c248ed-0240-408e-a4dd-76a7ccb1a92e.png?alt=media&token=1046ecc4-b37c-494a-9620-0599e921e9ed" alt="Cypoint Logo" width="200" height="100" style="margin: 1rem 0" />
    `;
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
