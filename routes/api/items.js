// where our routes will be
const express = require('express');
const router = express.Router();

// item model, need it to make queries to find and save items 
const Item = require('../../models/Item');

// @route GET api/items 
// @desc  get all items 
// @access Public 
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        // returns a promise
        .then(items => res.json(items))
});
// @route POST api/items 
// @desc   create an item
// @access Public 
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    // save to db then get the item back 
    newItem.save().then(item => res.json(item));
});
// @route DELETE api/items/:id 
// @desc  delete an item
// @access Public 
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});






module.exports = router; 