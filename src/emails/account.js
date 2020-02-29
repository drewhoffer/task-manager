const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)




const sendWelcomeEmail = (email, name) => {
	// sgMail.send({
	// 	to:email,
	// 	from: '',
	// 	subject: 'Thanks for signing up!',
	// 	text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
	// })

}

const sendGoodbyeEmail = (email, name) => {
	// sgMail.send({
	// 	to:email,
	// 	from: '',
	// 	subject: 'Sorry to see you go!',
	// 	text: `We would love to hear what we could do better!`
	// })
}

module.exports = {
	sendWelcomeEmail,
	sendGoodbyeEmail
}