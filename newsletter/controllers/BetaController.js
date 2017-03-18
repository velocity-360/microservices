var Beta = require('../models/Beta')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')
var utils = require('../utils')

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

			Beta.find(params, null, {limit:parseInt(limit), sort:{timestamp: sortOrder}}, function(err, betas){
				if (err){
					reject(err)
					return
				}

				resolve(betas)
				// if (isRaw == true){
				// 	resolve(betas)
				// 	return
				// }

				// resolve(utils.Resource.convertToJson(betas))
			})
		})
	},

	getById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Beta.findById(id, function(err, beta){
				if (err){
					reject(err)
					return
				}

				if (isRaw){
					resolve(beta)
					return
				}

				resolve(beta)
			})
		})
	},

	post: function(params){
		return new Promise(function(resolve, reject){
			if (params.password != null)
				params['password'] = bcrypt.hashSync(params.password, 10)
			
			Beta.create(params, function(err, beta){
				if (err){
					reject(err)
					return
				}

				utils.Email.sendEmail(process.env.BASE_EMAIL, 'dkwon@velocity360.io', 'New Beta User', JSON.stringify(params))
				resolve(beta)
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

			Beta.findByIdAndUpdate(id, params, {new:true}, function(err, beta){
				if (err){
					reject(err)
					return
				}

				resolve(beta)
			})


		})
	},

	delete: function(id){
		return new Promise(function(resolve, reject){
			Beta.findByIdAndRemove(id, function (err){
			    if (err) { 
					reject(err)
					return
			    }

			    resolve()
			})
		})
	}

}

