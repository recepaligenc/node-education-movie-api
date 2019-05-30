const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('Node Server', ()=>{
    it('Get /', (done)=> {
        chai.request(server)
            .get('/')
            .end((err, res)=>{
                res.should.have.status(200);
                console.log("abc");
                done();
            })
    });
});
