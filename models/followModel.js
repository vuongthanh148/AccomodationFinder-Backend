const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	accommodation: {
		type: [mongoose.Schema.Types.ObjectId],
		required: true,
		default: []
	},
});
//Pre save send notification 

module.exports = mongoose.model('follow', followSchema);
