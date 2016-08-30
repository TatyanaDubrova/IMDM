/**
 * Created by tatsiana.dubrova on 17.08.2016.
 */
'use strict';

var _Router = require('Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = chai.assert;

describe('Tests General Configuration', function () {
    it('should not be null', function () {
        assert.isNotNull("Basic Test");
    });
});

describe('Router', function () {
    describe('#constructor', function () {
        var router = void 0;
        beforeEach(function () {
            // Create a new Router object before every test.
            router = new _Router2.default();
        });

        it('returns the mode', function () {
            // This will fail if "router.mode" does
            // not equal #hash.
            router.mode.should.equal("hash");
        });

        it('mode can be changed to "history"', function () {
            // Assert that the mode can be changed to "history".
            router.mode = "history";
            router.mode.should.equal('history');
        });
    });
});

//# sourceMappingURL=app.spec-compiled.js.map