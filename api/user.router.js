const router = require("express").Router();
const auth = require('../middleware/auth');

const { register ,loginUser} = require('../controllers/user.controller');

router.post('/register' , register);
router.post('/login' , loginUser);


module.exports = router;