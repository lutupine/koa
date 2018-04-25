let Chai = require("chai");
let ChaiHttp = require("chai-http");
var Server = require('../index');
let should = Chai.should();
Chai.use(ChaiHttp);
describe('Account list by Member ID', function() {
	it("Should respond with account list for valid request",function(done) {
		 Chai.request(Server)
            .get('/user')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });
	
});