const request = require('request');

module.exports = function(ctx, cb) {

	if (!ctx.body) {
		cb(null, 'you successfully deploy Github Stats to CouchDB Collector Webtask');
	} else {
		const url =
			'https://' + ctx.secrets.COUCHDB_USERNAME + ':' + ctx.secrets.COUCHDB_PASSWORD +
			'@' + ctx.secrets.COUCHDB_URL;
		request.post(url,
    { json: ctx.body },
    function (error, response, body) {
				if (error) {
					return cb(error);
				}
				if (response.statusCode < 200 || response.statusCode > 299) {
					return cb('response code ' + response.statusCode);
				}

				cb(null, body);
    });

	}
}
