const nodemailer = require('nodemailer');

var sendMail = async(receiver, subject,  message) => {
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth: {
                user: "adityauniversityclubs@gmail.com", 
                pass: "iiyg cqtg bbdf krsa"
        }
    });

    const mailOptions  = {
        from: "adityauniversityclubs@gmail.com",
        to: receiver,
        subject: subject,
        text: message,
    }

    await transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            return res.status(500).json(err);
        }
        return res.staus(200).json({success: true, message: "Mail sent successfully"});
    })  

};

module.exports = {
    sendMail
}

