var Track = require('../models/Track')
var Promise = require('bluebird')

module.exports = {
	get: function(params){
		return new Promise(function(resolve, reject){
			var sortOrder = (params.sort == 'asc') ? 1 : -1
			delete params['sort']

			/* Query by filters passed into parameter string: */
			var limit = params.limit
			if (limit == null)
				limit = '0'
			
			delete params['limit']

			Track.find(params, null, {limit:parseInt(limit), sort:{timestamp: sortOrder}}, function(err, tracks){
				if (err){
					reject(err)
					return
				}

				resolve(tracks)
			})
		})
	},

	getById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Track.findById(id, function(err, track){
				if (err){
					reject(err)
					return
				}

				if (isRaw){
					resolve(track)
					return
				}

				resolve(track)
			})
		})
	},

	post: function(params){
		return new Promise(function(resolve, reject){
			Track.create(params, function(err, track){
				if (err){
					reject(err)
					return
				}

				resolve(track)
			})
		})
	},

	put: function(id, params, token){
		return new Promise(function(resolve, reject){
			// if (token == null){
			// 	reject({message: 'Unauthorized'})
			// 	return
			// }

			// utils.JWT.verify(token, process.env.TOKEN_SECRET)
			// .then(function(decode){
			// 	var userId = decode.id
			// 	console.log('USER ID: '+userId)
			// 	// TODO: check if user is authorized to change post

			// 	Post.findByIdAndUpdate(id, params, {new:true}, function(err, post){
			// 		if (err){
			// 			reject(err)
			// 			return
			// 		}

			// 		resolve(post.summary())
			// 	})
			// })
			// .catch(function(err){
			// 	reject(err)
			// 	return
			// })

			Track.findByIdAndUpdate(id, params, {new:true}, function(err, track){
				if (err){
					reject(err)
					return
				}

				resolve(track)
			})


		})
	},

	delete: function(id){
		return new Promise(function(resolve, reject){
			Track.findByIdAndRemove(id, function (err){
			    if (err) { 
					reject(err)
					return
			    }

			    resolve()
			})
		})
	}

}

