const fetch = require('isomorphic-fetch');

const templateBuilder = {
	getTemplate: function(url) {
		return fetch(url).then(function(res) {
			return res.json();
		});
	}
};

module.exports = templateBuilder;
