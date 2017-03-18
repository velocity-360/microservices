var mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({
	email: {type:String, trim:true, lowercase:true, default:''},
	sessions: {type:Array, default:[]},
	timestamp: {type:Date, default:Date.now}
})

module.exports = mongoose.model('TrackSchema', TrackSchema)