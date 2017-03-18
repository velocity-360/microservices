var mongoose = require('mongoose')

var BetaSchema = new mongoose.Schema({
	firstName: {type:String, trim:true, lowercase:true, default:''},
	lastName: {type:String, trim:true, lowercase:true, default:''},
	confirmed: {type:String, default:'no'},
	email: {type:String, trim:true, lowercase:true, default:''},
	plan: {type:String, trim:true, lowercase:true, default:'basic'}, // bronze, gold, platinum
	stripeId: {type:String, trim:true, default:''},
	creditCard: {type:mongoose.Schema.Types.Mixed, default:{}},
	password: {type:String, default:''},
	monthlyRate: {type: Number, default: 0},
	image: {type:String, trim:true, default:''}, // default profile icon
	timestamp: {type:Date, default:Date.now},
})

module.exports = mongoose.model('BetaSchema', BetaSchema)