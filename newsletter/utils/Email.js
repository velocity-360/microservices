var Promise = require('bluebird')

module.exports = {

	sendEmail: function(from, fromname, recipient, subject, text){
		return new Promise(function (resolve, reject){

			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)
			sendgrid.send({
				to:       recipient,
				from:     from,
				fromname: fromname,
				subject:  subject,
				text:     text
			}, function(err) {
				if (err) {
					console.log('EMAIL MANAGER ERROR: '+err)
					reject(err); 
				}
				else { resolve(); }
			})
		})
	},

	sendEmails: function(from, fromname, recipients, subject, text){
		return new Promise(function (resolve, reject){

			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)
			for (var i=0; i<recipients.length; i++){
				var recipient = recipients[i]
				if (recipient.indexOf('@') == -1) // invalid
					continue

				sendgrid.send({
					to:       recipient,
					from:     from,
					fromname: fromname,
					subject:  subject,
					html:     text
					//text:     text
				}, function(err) {
					// if (err) {reject(err); }
					// else { resolve(); }
				})
			}

			resolve()
		})
	},	

	sendHtmlEmail: function(from,fromname, recipient, subject, html){
		return new Promise(function (resolve, reject){

			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)
			sendgrid.send({
				to:       recipient,
				from:     from,
				fromname: fromname,
				subject:  subject,
				html:     html
			}, function(err) {
				if (err) {reject(err) }
				else { resolve() }
			})
		})
	}



}