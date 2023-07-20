const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */
const {publicAPIAuthentication,generateJWS} = require('../../controllers/user/userController') /*Importing publicAPIAuthentication from user controller */


//User Routes
// To generate the JWS Token
router.post('/generateJWS',generateJWS)

//To get the JWT token using JWS already generated
router.get('/publicAPIAuthentication',publicAPIAuthentication)

//Exporting router
module.exports = router;