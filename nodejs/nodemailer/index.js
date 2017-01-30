var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
	service: 'qq',
	auth: {
		user: 'yourqq@qq.com',
		pass: 'yourpassword'
	}
});

// setup e-mail data with unicode symbols
var mailOptions = {
	from: '"Alan Cao" <yourqq@qq.com>', // sender address
	to: 'xyz@gmail.com', // list of receivers
	subject: 'Hello ✔', // Subject line
	text: 'Hello world ?' // plaintext body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
	if(error){
		return console.log(error);
	}
	console.log('Message sent: ' + info.response);
});
