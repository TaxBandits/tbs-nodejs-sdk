const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */
const {updateBusiness} = require('../../controllers/business/updateBusinessController') /*Importing Update Business from business controller */


//Update Business Route
router.put('/Update', updateBusiness)

//Exporting router
module.exports = router