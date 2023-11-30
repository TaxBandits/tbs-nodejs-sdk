const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */
const {publicAPIAuthentication,generateJWS,pingApi,getServerTime} = require('../../controllers/user/userController') /*Importing publicAPIAuthentication from user controller */


//User Routes
// To generate the JWS Token
router.post('/generateJWS',generateJWS)

//To get the JWT token using JWS already generated
router.get('/publicAPIAuthentication',publicAPIAuthentication)

//To get Server Time
router.get('/getservertime',getServerTime)

//To verify JWT using Ping Api
router.get('/ping',pingApi)

//Exporting router
module.exports = router;