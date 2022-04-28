const Odoo = require('odoo-xmlrpc');

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}
	return new Promise((resolve, reject) => {
		const odoo = new Odoo({
			url: req.body.url,
			port: req.body.port || 8069,
			db: req.body.db,
			username: req.body.user,
			password: req.body.pwd,
		});

		odoo.connect(function (err) {
			if (err) {
				if (err.message) {
					res
						.status(500)
						.json({ message: 'Hubo un error', payload: err.message });
					return;
				}
				res
					.status(500)
					.json({ message: 'Hubo un error', payload: err.toString() });
				return;
			}
			const inParams = [];
			JSON.parse(req.body.args).forEach((item) => {
				inParams.push(item);
			});
			const params = [];
			params.push(inParams);
			odoo.execute_kw(
				req.body.model,
				req.body.method,
				params,
				function (err, value) {
					if (err) {
						res
							.status(500)
							.json({ message: 'Hubo un error', payload: err.toString() });
						return;
					}
					res.status(200).json({ value });
					resolve();
				}
			);
		});
	});
}
