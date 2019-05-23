const express = require('express');
const router = express.Router();

const Movies = require('../models/Movie');

router.get ('/', (req,res,next)=>{
    const promise = Movies.find({});
    promise.then((data)=>{
        if (!data){
            next({message: 'The movie was not found',
                error: {
                    status: 101,
                    stack : 'Movie not found stack'
                    }
                });
        }
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
})

router.get ('/top10', (req,res,next)=>{
    const promise = Movies.find({}).limit(5);
    promise.then((data)=>{
        if (!data){
            next({message: 'The movie was not found',
                error: {
                    status: 101,
                    stack : 'Movie not found stack'
                }
            });
        }
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
})

router.get ('/:movie_id', (req,res,next)=>{
    //const promise = Movies.find({_id: req.params.movie_id});
    const promise = Movies.findById(req.params.movie_id);
    promise.then((data)=>{

        if (!data){
            next({"message": 'The movie was not found',
                   "detail": {
                       "status": 101,
                       "stack": 'Movie not found stack'
                   }
            });
        }
        else
        {
            res.json(data);
        }

    }).catch((err)=>{
        res.json(err);
    });
})

router.get ('/:start_year/:end_year', (req,res,next)=>{
    //const promise = Movies.find({_id: req.params.movie_id});
    const promise = Movies.find({
        date :
            {
                "$gte": req.params.start_year,
                "$lte": req.params.end_year
            }
    });

    promise.then((data)=>{

        if (!data){
            next({"message": 'The movie was not found',
                "detail": {
                    "status": 101,
                    "stack": 'Movie not found stack'
                }
            });
        }
        else
        {
            res.json(data);
        }

    }).catch((err)=>{
        res.json(err);
    });
})


router.put ('/:movie_id', (req,res,next)=>{
    //const promise = Movies.find({_id: req.params.movie_id});
    const promise = Movies.findByIdAndUpdate(
        req.params.movie_id, req.body
    );

    promise.then((data)=>{
        if (!data){
            next({"message": 'The movie was not found',
                "detail": {
                    "status": 101,
                    "stack": 'Movie not found stack'
                }
            });
        }
        else
        {
            res.json(data);
        }

    }).catch((err)=>{
        res.json(err);
    });
})

router.delete ('/:movie_id', (req,res,next)=>{
    //const promise = Movies.find({_id: req.params.movie_id});
    const promise = Movies.findByIdAndRemove(req.params.movie_id);
    promise.then((data)=>{
        if (!data){
            next({"message": 'The movie was not found',
                "detail": {
                    "status": 101,
                    "stack": 'Movie not found stack'
                }
            });
        }
        else
        {
            res.json(data);
        }

    }).catch((err)=>{
        res.json(err);
    });
})

router.post('/', (req, res, next)=> {
    const data= req.body;

    const {title, imdb_score, category, country, year, director_id} = req.body;

    const movies = new Movies({
        title: title,
        imdb_score : imdb_score,
        director_id : director_id,
        category : category,
        country : country,
        year : year
    })

    /*
    movie.save((err,data)=>{
        if (err)
        {
            res.json(err);
        }

        res.json(data);
    })
    */

    const promise =  movies.save();
    promise.then((updateddata)=>{
        res.json({status: 1,
                        _id : updateddata.id});
    }).catch((err) =>{
        res.json(err);
    });

});

module.exports = router;
