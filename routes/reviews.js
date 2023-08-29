const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require("../utilities/catchAsync");
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews');



//this route creates a new review 
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

//this route deletes an existing review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;