const express = require('express');
const router = express.Router();

const Movies = require('../models/Movie');

router.post('/', (req, res, next)=> {
    const data= req.body;

    const {title, imdb_score, category, country, year} = req.body;

    const movies = new Movies({
        title: title,
        imdb_score : imdb_score,
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
    promise.then((data)=>{
        res.json({status: 1});
    }).catch((err) =>{
        res.json(err);
    });

});

module.exports = router;
