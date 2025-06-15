const express = require('express');
const router = express.Router();
const passport = require('passport');


router.use('/', require('./swagger'));
router.use('/volleyball', require('./volleyball'));
router.use('/soccer', require('./soccer'));



// router.use('basketball', require('./basketball'));
// router.use('/user', require('./user'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next){
    req.logout(function(err){
        if(err) {return next(err);}
        res.redirect('/');
    });
});

module.exports = router;