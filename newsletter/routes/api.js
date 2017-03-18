var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

router.get('/:resource', function(req, res, next){
	var resource = req.params.resource

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message: 'Invalid Resource'
		})
		return
	}

	controller
	.get(req.query, false, null)
//	.get(req.query, false, req.session.token)
	.then(function(results){
		res.json({
			confirmation: 'success',
			results: results
		})

		return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})

		return
	})
})

router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message: 'Invalid Resource.'
		})
		return
	}

	controller
	.getById(id, false, null)
//	.getById(id, false, req.session.token)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})

		return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: 'Not found'
		})

		return
	})
})

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message: 'Invalid Resource.'
		})
		return
	}

	controller
	.post(req.body, null)
//	.post(req.body, req.session.token)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})

		return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})

		return
	})
})

router.put('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message: 'Invalid Resource.'
		})
		return
	}

	controller
//	.put(id, req.body, req.session.token)
	.put(id, req.body, null)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})

		return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})

		return
	})
})

router.delete('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message: 'Invalid Resource.'
		})
		return
	}

	controller
//	.delete(id, req.session.token)
	.delete(id, null)
	.then(function(){
		res.json({
			confirmation: 'success'
		})
		return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})

		return
	})

})

module.exports = router

