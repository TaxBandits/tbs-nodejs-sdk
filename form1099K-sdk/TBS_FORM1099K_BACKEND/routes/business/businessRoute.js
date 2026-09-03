const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */
const { createBusiness } = require('../../controller/business/createBusinessController') /*Importing CREATE Business from business controller */
const { listBusiness } = require('../../Controller/business/listBusinessController') /*Importing LIST Business from business controller */
const {getBusiness} = require('../../Controller/business/getBusinessController') /*Importing GET Business from business controller */


router.post('/Create', createBusiness) // Create business Route
router.get('/List', listBusiness) // List Business Route
router.get('/Get/:BusinessId', getBusiness) //Get Business Route

//Exporting router
module.exports = router