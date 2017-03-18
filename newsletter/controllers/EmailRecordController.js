var EmailRecord = require('../models/EmailRecord')
var Promise = require('bluebird')

module.exports = {
	get: function(params){
		return new Promise(function(resolve, reject){
			// var sortOrder = (params.sort == 'asc') ? 1 : -1
			// delete params['sort']

			/* Query by filters passed into parameter string: */
			// var limit = params.limit
			// if (limit == null)
			// 	limit = '0'
			
			// delete params['limit']

			EmailRecord.find(params, null, {limit:1, sort:{timestamp: -1}}, function(err, emailrecords){
				if (err){
					reject(err)
					return
				}

				resolve(emailrecords)
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
			EmailRecord.findById(id, function(err, emailrecord){
				if (err){
					reject(err)
					return
				}

				if (isRaw){
					resolve(emailrecord)
					return
				}

				resolve(emailrecord)
			})
		})
	},

	post: function(params){
		return new Promise(function(resolve, reject){
			EmailRecord.create(params, function(err, emailrecord){
				if (err){
					reject(err)
					return
				}

				resolve(emailrecord)
			})
		})
	},

	put: function(id, params, token){
		return new Promise(function(resolve, reject){
			EmailRecord.findByIdAndUpdate(id, params, {new:true}, function(err, emailrecord){
				if (err){
					reject(err)
					return
				}

				resolve(emailrecord)
			})


		})
	},

	delete: function(id){
		return new Promise(function(resolve, reject){
			EmailRecord.findByIdAndRemove(id, function (err){
			    if (err) { 
					reject(err)
					return
			    }

			    resolve()
			})
		})
	}

}

