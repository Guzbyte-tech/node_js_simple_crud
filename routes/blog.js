const express = require('express');
const router = express.Router();
const BlogController = require('../controller/BlogController')

router.get('/', BlogController.index);

router.get('/create', BlogController.create)

router.post('/store', BlogController.store)

//Route with Params
router.get('/:id', BlogController.show);

router.delete('/:id', BlogController.destroy);

module.exports = router;