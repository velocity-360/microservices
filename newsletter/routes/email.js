var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var Promise = require('bluebird')
var utils = require('../utils')
var fs = require('fs')
var Base64 = require('js-base64').Base64

var fetchFile = function(path){
	return new Promise(function (resolve, reject){
		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {reject(err) }
			else { resolve(data) }
		})
	})
}


router.post('/:action', function(req, res, next) {
	var action = req.params.action // newsletter, announcement, etc

	if (action == 'announcement'){
		var emailrecord = null
		var list = null
		var confirmed = []

		controllers.emailrecord
		.get(null)
		.then(function(records){
			// console.log('RECORDS: '+JSON.stringify(records))
			emailrecord = (records == 0) ? {sent:[]} : records[0]
			var emails = req.body.emails
			list = emails.split(',')
			list.push('dkwon@velocity360.io')

			list.forEach(function(email){
				var html = req.body.content

				var address = email.trim().toLowerCase()
				// html = html.replace('{{email}}', address)
				// var encoded = Base64.encode(address)

				confirmed.push(address)
				utils.Email.sendHtmlEmail(req.body.fromemail, req.body.fromname, address, req.body.subject, html)
			})

			return (emailrecord.id == null) ? controllers.emailrecord.post(emailrecord) : emailrecord
		})
		.then(function(emailrecord){
			var sent = emailrecord.sent
			sent.push({
				date: Date.now(),
				emails: confirmed,
				template: action
			})

			if (req.body.mode == 'live')
				emailrecord.save()
			
		    res.json({
		    	confirmation: 'success',
		    	sent: confirmed
		    })

		    return
		})
		.catch(function(err){
		    res.json({
		    	confirmation:'fail',
		    	message: err.message
		    })

		})

		return
	}

	if (action == 'newsletter'){
		
		return
	}

    res.json({
    	confirmation:'fail',
    	message: 'Invalid Action'
    })
})

router.get('/:action', function(req, res, next) {
	var action = req.params.action // unsubscribe
	var controller = controllers.emailrecord

	if (action == 'pixel'){ // tracking pixel
		var utm = req.query.utm
		var email = Base64.decode(utm)

		controller
		.get(null)
		.then(function(records){
			var emailrecord = (records == 0) ? {sent:[], unsubscribed:[], opened:[]} : records[0]
			var opened = emailrecord.opened
			if (opened.indexOf(email) == -1)
				opened.push(email)

			res.send('')
			return (emailrecord._id == null) ? controller.post(emailrecord) : controller.put(emailrecord._id, {opened: opened})
		})
		.catch(function(err){
			console.log('ERROR: '+err)
			res.send('')
		})

		return
	}


	if (action == 'unsubscribe'){
		var email = req.query.email

		controller
		.get(null)
		.then(function(records){
			var emailrecord = (records == 0) ? {sent:[], unsubscribed:[]} : records[0]
			var unsubscribed = emailrecord.unsubscribed
			if (unsubscribed.indexOf(email) == -1)
				unsubscribed.push(email)

			utils.Email.sendEmail(process.env.BASE_EMAIL, 'Velocity 360', 'dkwon@velocity360.io', 'Unsubscribe', email+' unsubscribed')
			res.send('You have been unsubscribed, thank you.')

			return (emailrecord._id == null) ? controller.post(emailrecord) : controller.put(emailrecord._id, {unsubscribed: unsubscribed})
		})
		.catch(function(err){
			console.log('ERROR: '+err)
			utils.Email.sendEmail(process.env.BASE_EMAIL, 'Velocity 360', 'dkwon@velocity360.io', 'Unsubscribe', email+' unsubscribed')
			res.send('You have been unsubscribed, thank you.')
		})

		return
	}

	if (action == 'encode'){
		res.json({
			confirmation: 'success',
			encoded: Base64.encode('dankogai')
		})

		return
	}

	if (action == 'decode'){
		res.json({
			confirmation: 'success',
			decoded: Base64.decode('ZGFua29nYWk=')
		})

		return
	}

    res.json({
    	confirmation:'fail',
    	message: 'Invalid Action'
    })
})

module.exports = router
