/**
 * Created by tatsiana.dubrova on 17.08.2016.
 */
'use strict';
import Router from "Router";
let assert = chai.assert;

describe('Tests General Configuration', () => {
    it('should not be null', () => {
        assert.isNotNull("Basic Test")
    })
});

describe('Router', () => {
    describe('#constructor', () => {
        let router;
        beforeEach(() => {
            // Create a new Router object before every test.
            router = new Router();
        });

        it('returns the mode', () => {
            // This will fail if "router.mode" does
            // not equal #hash.
            router.mode.should.equal("hash");
        });

        it('mode can be changed to "history"', () => {
            // Assert that the mode can be changed to "history".
            router.mode = "history";
            router.mode.should.equal('history');
        });

    })
});
