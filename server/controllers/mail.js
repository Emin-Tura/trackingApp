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
    `;
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
