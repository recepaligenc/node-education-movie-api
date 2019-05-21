const express = require('express');
const router = express.Router();

const bcryptLib = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/User');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

router.get ('/:user_id', (req,res,next)=>{
    const promise = Users.findById(req.params.user_id);
    promise.then((data)=>{

        if (!data){
            next({"message": 'The user was not found',
                "detail": {
                    "status": 101,
                    "stack": 'user not found stack'
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
});

router.post('/register', (req, res, next)=> {
    const data= req.body;

    const {userName, Password} = req.body;

    const hasPromise = bcryptLib.hash(Password, saltRounds).then((hash)=> {
        const user = new Users({
            userName: userName,
            Password : hash
        });

        const promise =  user.save();
        promise.then((data)=>{
            res.json({status: 1});
        }).catch((err) =>{
            res.json(err);
        });
    });
});

router.post('/login', (req, res, next)=> {
    const data= req.body;
    const {userName, Password} = req.body;
    const promise = Users.findOne({userName: userName});
    promise.then((data)=>{
        const dbHashedPassword = data.Password;
        bcryptLib.compare(Password, dbHashedPassword).then((result)=> {
            if (result == true)
            {
                const payload = {
                    username :  data.userName
                }

                const token = jwt.sign(
                    payload,
                    req.app.get('api_secret_key'),
                    {
                        expiresIn: 720 //12 hours
                    });

                data.lastToken = token;

                const promise =  data.save();
                promise.then((data)=>{
                    res.json({
                        status: true,
                        token:token
                    });
                }).catch((err) =>{
                    res.json(err);
                });


            }
            else
            {
                next({"message": 'The user was not found',
                    "detail": {
                        "status": 102,
                        "stack": 'user not found stack'
                    }
                });
            }
        });
    }).catch((err) =>{
        res.json(err);
    });
});

module.exports = router;
