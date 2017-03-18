var mongoose = require('mongoose')

var EmailRecordSchema = new mongoose.Schema({
	sent: {type:Array, default:[]},
	opened: {type:Array, default:[]},
	unsubscribed: {type:Array, default:[]},
	timestamp: {type:Date, default:Date.now}
})

module.exports = mongoose.model('EmailRecordSchema', EmailRecordSchema)