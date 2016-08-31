var subModule = require('../src/module-dependency');
var stub = sinon.stub(subModule, 'getDate').returns(new Date(112233));	// stub sub module before module under test loads it

var module = require('../src/module-under-test');

describe('module test', function() {

	it('should stub module dependency correctly', function() {
		expect(module().getTime()).to.equal(112233);
	});
});
