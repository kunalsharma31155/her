const router = require("express").Router();
const auth = require('../middleware/auth');

const { getMatches } = require('../controllers/getsports.controller');

router.post('/get-matches' ,auth, getMatches);


module.exports = router;