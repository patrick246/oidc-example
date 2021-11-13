const http = require('http');

const options = {
	tokenUrl: '',
	clientId: '02-client-credentials',
	clientSecret: 'a2332698-d1f2-4cd0-9eea-0d9e21f897ae',
}

function getAuthToken() {
	return new Promise((resolve, reject) => {
		const body = new TextEncoder().encode(`grant_type=client_credentials&client_id=${options.clientId}&client_secret=${options.clientSecret}`);
		const req = http.request({
			host: 'localhost',
			port: 8080,
			path: '/auth/realms/test/protocol/openid-connect/token',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': body.length,
			},
		}, res => {
			res.on('data', d => resolve(d));
			res.on('error', err => reject(err));
		});

		req.write(body);
		req.end();
	})
		.then(data => JSON.parse(data))
		.then(data => {
			if (data.error) {
				return Promise.reject(data.error);
			}
			return data;
		})
		.then(result => result.access_token);
}

getAuthToken()
	.then(token => {
		console.log(token);
		console.log(JSON.stringify(JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()), null, 2));
	})
	.catch(err => console.log('err', err));


