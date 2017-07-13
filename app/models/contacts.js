var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema ({
	name: { type: String, required: true, unique: true},
	email: { type: String, required: true, unique: true},
	number: { type: String, required: true, unique: true}
});

//export to server file
module.exports = mongoose.model('Contact', ContactSchema);