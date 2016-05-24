const fetch = require('isomorphic-fetch');
const url1 = 'https://testwacomeur.appdirect.com/api/channel/v1/styles/WACOM/templates/published?locale=en-US';

const templateBuilder = {
	getTemplate: function(url) {
		return fetch(url).then(function(res) {
			return res.json();
		});
	}
};

module.exports = templateBuilder;