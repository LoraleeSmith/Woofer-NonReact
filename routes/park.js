const express = require('express');
router = express.Router({ mergeParams: true }),
    Park = require('../models/park'),
    middleware = require('../middleware/index');

// INDEX - show all parks
router.get('/', function (req, res) {
    // get all parks from DB
    const perPage = 12;
    const pageQuery = parseInt(req.query.page);
    const pageNum = pageQuery ? pageQuery : 1;
    Park.find({}).skip((perPage * pageNum) - perPage).limit(perPage).exec(function (err, allPark) {
        Park.count().exec(function (err, count) {
            if (err) {
                console.log("Error: " + err);
            } else {
                res.render('park/index', { title: 'All Parks', park: allPark, current: pageNum, pages: Math.ceil(count / perPage) });
            };
        });
    });
});

// create new park and save to DB
router.post('/:id', function (req, res) {
    Park.create(req.body.park, function (err, park) {
        if (err) {
            // console.log('Error: ' + err);
            return res.redirect('back');
        } else {
            // redirect to park
            console.log('New Park: ' + park);
            res.redirect('/park/' + park.id);
        };
    });
})

// NEW - show form to add park
router.get('/new', middleware.isLoggedIn, function (req, res) {
    res.render('park/new', { title: 'Add A Park' });
});

// SHOW - displays more info about a specific park
router.get('/:id', function (req, res) {
    // find park with provided ID
    Park.findById(req.params.id).populate('comments').exec(function (err, foundPark) {
        if (err) console.log(err);
        res.render('park/show', { title: '<%= foundPark.name %>', park: foundPark });
    });
    // render show temp with that park
});

// EDIT 
router.get('/:id/edit', middleware.checkParkOwnership, function (req, res) {
    Park.findById(req.params.id, function (err, foundPark) {
        if (err) {
            res.redirect('back');
        } else {
            res.render('park/edit', { title: 'Edit A Park', park: foundPark });
        };
    });
});

// UPDATE
router.put('/:id', middleware.checkParkOwnership, function (req, res) {
    // find and update park
    Park.findByIdAndUpdate(req.params.id, req.body.park, function (err, updatedPark) {
        if (err) {
            res.redirect('/park');
        } else {
            res.redirect('/park/' + req.params.id);
        }
    })
});

// DESTROY
router.delete('/:id', middleware.checkParkOwnership, function (req, res) {
    Park.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/park');
        } else {
            res.redirect('/park');
        }
    })
});

module.exports = router;