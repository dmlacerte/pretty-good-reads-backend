const express = require('express')
const router = express.Router()
const axios = require('axios')

const Book = require('../models/book-model')
const User = require('../models/user-model')


//Get books associated with an individual user account
router.get("/user/:userId", async (req, res) => {
    const user = await User.findOne({"googleId" : req.params.userId})

    const wishlist = await Book.find({ "_id" : { $in: user.wishlist } })
    const reading = await Book.find({ "_id" : { $in: user.reading } })
    const finished = await Book.find({ "_id" : { $in: user.finished } })
    
    res.send({
        wishlist,
        reading,
        finished
    })
})

//Get book details
router.get('/:id', (req, res) => {
    Book.find({id: req.params.id})
    .then(book => {
        //if (book) send it back
        //else search API
        if (book.length === 0) res.json(null)
        else res.json(book)
    })
    .catch(console.error)
})

//Add new book
router.post('/post', (req, res) => {
    Book.create(req.body)
    .then(book => res.json(book))
    .catch(console.error)
})

module.exports = router