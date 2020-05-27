const { ADMIN } = require('../config');

const verify_admin = (req, res, next) => {
	if(req.body.email === ADMIN) {
		next();
	} else {
		res.status(401).json({
			success: false
		})
	}
}

module.exports = verify_admin;