const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */
const { listBusiness } = require('../../controllers/business/listBusinessController') /*Importing LIST Business from business controller */


// List Business Route
router.get('/List', listBusiness)

//Exporting router
module.exports = router