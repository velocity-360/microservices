var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var Base64 = require('js-base64').Base64

router.get('/', function(req, res, next) {
	var utm = req.query.utm
	if (utm != null){
		// TODO: insert utm as a cookie on browser
		var email = Base64.decode(utm)
		// console.log('EMAIL = '+email)

		controllers.track
		.get({email: email})
		.then(function(tracks){
			console.log('TRACKS = '+JSON.stringify(tracks))
			return (tracks.length == 0) ? controllers.track.post({email:email}) : tracks[0]
		})
		.then(function(track){
			var sessions = track.sessions
			sessions.push({
				date: Date.now()
			})

			controllers.track.put(track._id, {sessions: sessions})
		})
		.catch(function(err){
			console.log('ERROR = '+err.message)

		})
	}

	var template = (process.env.ENVIRONMENT=='dev') ? 'index-dev' : 'index'
    res.render(template, null)
})

router.get('/:page', function(req, res, next) {
    res.render(req.params.page, null)
})

module.exports = router
