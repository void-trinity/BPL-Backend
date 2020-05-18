const jwt = require('jsonwebtoken');

const { PRIVATE_KEY } = require('../config');

const generate_jwt = (user) => {
	var token = jwt.sign({ data: JSON.stringify(user) }, PRIVATE_KEY, { expiresIn: '30d' });
	return token;
}

const verify_jwt = (req, res, next) => {
	var token = req.header('authorization');
	jwt.verify(token, PRIVATE_KEY, (error, decoded) => {
		if(error) {
			res.status(401).json({
				success: false,
				data: 'Unauthorized Access',
				code: 401
			});
			return;
		}
		req['user'] = JSON.parse(decoded.data);
		next();
	})
}

module.exports = {
	generate_jwt,
	verify_jwt
}