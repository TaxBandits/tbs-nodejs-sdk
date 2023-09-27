const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */
const { createBusiness } = require('../../controllers/business/createBusinessController') /*Importing CREATE Business from business controllers */
const { listBusiness } = require('../../controllers/business/listBusinessController') /*Importing LIST Business from business controllers */
const { getBusiness } = require('../../controllers/business/getBusinessController') /*Importing GET Business from business controllers */

//Business Routes
router.post('/Create', createBusiness) // Create business Route
router.get('/List', listBusiness) // List Business Route
router.get('/Get/:BusinessId', getBusiness) //Get Business Route

//Exporting router
module.exports = router