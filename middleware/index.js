const Park = require('../models/park'),
    comments = require('../models/comment');

let middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    };
    res.redirect('/login');
};

middlewareObj.checkParkOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Park.findById(req.params.id, function (err, foundPark) {
            if (err) {
                res.redirect('back');
            } else {
                if (foundPark.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                console.log(err);
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
};

module.exports = middlewareObj;