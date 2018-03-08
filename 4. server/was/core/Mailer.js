var NodeMailer      = require('nodemailer')
    , Q             = require('q');

module.exports = {
    send: function(to, code){
        var smtpConfig = {
            host: 'smtp.worksmobile.com',
            port: 465,
            secure: true,
            auth: {
                user: 'aram@aram-in.com',
                pass: 'wodnr86!@'
            }
        };
        var mailOptions = {
            from: 'aram@aram-in.com',
            to: to,
            subject: '캡스톤 엑스포 비밀번호 재설정',
            text: '임시 비밀번호는 (' + code + ') 입니다. 1시간 이내에 접속하여 새로운 비밀번호로 설정하시기 바랍니다.'
        }
        var transporter = NodeMailer.createTransport(smtpConfig);
        transporter.sendMail(mailOptions);
    }
}