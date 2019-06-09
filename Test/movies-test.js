const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('api/movies TEST', ()=>{
    let token;
    let movie_id;

    before((done)=>{
        chai.request(server)
            .post('/api/users/login')
            .send({ userName: 'recepgenc', Password: 'developer234234' })
            .end((err, res)=>{
                res.should.have.status(200);
                token = res.body.token;
                done();
            });
    });

    describe('/Get - Get All Movies', ()=> {
        it('it should Get all movies', (done)=>{
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                   // console.log(res.body);
                    done();
                });
        });
    });

    describe('/Post - Insert New Movies',()=>{
        it('should post a movie', (done)=> {

            const movie = {
                "title": "film adı",
                "category": "bar",
                "country": "Turkey",
                "year":1990,
                "director_id":"5cdde5d808be050a00fcc903",
                "imdb_score": 9.7
            };

            chai.request(server)
                .post('/api/movies')
                .set('x-access-token', token)
                .send(movie)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('status');
                    movie_id = res.body._id;

                    done();
                });
        });
    });

    describe('/GET/:movie_id - Get Movie Detail',()=>{
        it('it should get related movie Id', (done)=> {

            chai.request(server)
                .get('/api/movies/' + movie_id)
                .set('x-access-token', token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('_id').eql(movie_id);
                   // console.log(res.body);
                    done();
                });
        });
    });

    describe('/PUT/:movie_id - Update Movie Detail',()=>{
        it('it should update related movie Id', (done)=> {

            const movie = {
                "title":"Man in the black moon",
                "category":"Horror",
                "country":"Turkey",
                "year":1990,
                "director_id":"5cdde5d808be050a00fcc903",
                "imdb_score": 9.7
            };

            chai.request(server)
                .put('/api/movies/' + movie_id)
                .set('x-access-token', token)
                .send(movie)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('_id').eql(movie_id);
                    // console.log(res.body);
                    done();
                });
        });
    })


    describe('/DELETE/:movie_id - Update Movie Detail',()=>{
        it('it should delete related movie Id', (done)=> {

            const movie = {
                "title":"Man in the black moon",
                "category":"Horror",
                "country":"Turkey",
                "year":1990,
                "director_id":"5cdde5d808be050a00fcc903",
                "imdb_score": 9.7
            };

            chai.request(server)
                .delete('/api/movies/' + movie_id)
                .set('x-access-token', token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('_id').eql(movie_id);
                    // console.log(res.body);
                    done();
                });
        });
    });


});

