var assert = require('assert');
var request = require('co-supertest');
var koa = require("koa");
var should = require('should');

describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            [1,2,3].indexOf(5).should.equal(-1);
            [1,2,3].indexOf(0).should.equal(-1);
        });
    });
});

describe("request(url)",function(){
    it('should be supported', function(done){
        var url = "http://localhost:3006";
        request(url).get("/").expect(200).end(function(err, r){
            if(err) return done(err);
            //r.text.should.equal("test");
            done();
        });
    });

});

describe("co-supertest", function(){
    before(function(){
        var app = koa();
        app.use(function*(){
            this.body = "test";
        });
        this.server = app.listen();
    });
    after(function*(){
        yield this.server.close.bind(this.server);
    });
    describe("#end()", function(){
        it("should support calls via yield", function*(){
            var r = yield supertest(this.server).get("/").expect(200).end();
            r.text.should.equal("test");
        });
        it("should support calls with callback", function(done){
            request(this.server).get("/").expect(200).end(function(err, r){
                if(err) return done(err);
                r.text.should.equal("test");
                done();
            });
        });
    });
});