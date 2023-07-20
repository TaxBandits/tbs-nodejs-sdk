const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */
const {getBusiness} = require('../../controllers/business/getBusinessController') /*Importing GET Business from business controller */


//Get Business Route
router.get('/Get/:BusinessId', getBusiness)

//Exporting router
module.exports = router