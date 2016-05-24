const builder = require('../src/template-builder');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const should = chai.should();
const sinon = require('sinon');
const fetchMock = require('fetch-mock');

chai.use(chaiAsPromised);

const template = '<div>test</div>';
const url = 'http://random.com';

describe('tempalte builder', function() {
	beforeEach(function() {
		fetchMock.mock(url, {
			body: "<div>it should work</div>",
			sendAsJson: true
		});

	});

	afterEach(function() {
		fetchMock.restore();
	});

	it('should fetch the template', function(done) {
		return builder.getTemplate(url).should.eventually.equal('123');
	});
});