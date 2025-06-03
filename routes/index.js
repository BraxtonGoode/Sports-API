const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API',
        status: 'success'
    });
});
router.use('/', require('./swagger'));
router.use('/volleyball', require('./volleyball'));
// router.use('/soccer', require('./soccer'));
// router.use('croquet', require('./croquet'));
// router.use('/user', require('./user'));

module.exports = router;