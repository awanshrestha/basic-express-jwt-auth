const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
    // res.sendFile('index.html', { root: path.join(__dirname, '../public') });
})

module.exports = router;