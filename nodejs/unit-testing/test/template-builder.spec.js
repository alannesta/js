const builder = require('../src/template-builder');

const template = '<div>test</div>';
const url = 'http://random.com';

describe('tempalte builder', function() {
	before(function() {
		// sinon.spy(global, 'fetch');
		nock(url)
			.get('/')
			.reply(200, {data: 123});
	});

	after(function() {
		// global.fetch.restore();
	});


	it('should fetch the template', function() {
		return builder.getTemplate(url).then(function(result) {
			expect(result.data).to.equal(123);
		})
	});
});
