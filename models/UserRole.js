const mongoose = require('mongoose');

const UserRoleSchema = mongoose.Schema({
    email: {
        type: String,
		required: true,
		min: 6,
		max: 255
	},
    roleno: {
        type: String,
        required: true,
        max: 255
    }
});

module.exports = mongoose.model('UserRole', UserRoleSchema);