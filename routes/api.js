const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

const { catchErrors } = require('../handlers/errorHandler')

router.post('/register', catchErrors(userController.register))
router.post('/login', catchErrors(userController.login))

router.get('/checkauth', auth,  (req, res) => {
    res.json({
        status: 'ok',
        message: "Authenticated."
    })
})
router.get('/logout', catchErrors(userController.logout))

module.exports = router;