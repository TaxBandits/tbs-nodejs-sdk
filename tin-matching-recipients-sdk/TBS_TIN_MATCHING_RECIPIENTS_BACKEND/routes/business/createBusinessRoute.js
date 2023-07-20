const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */
const { createBusiness } = require('../../controllers/business/createBusinessController') /*Importing CREATE Business from business controller */


// Create business Route
router.post('/Create', createBusiness)

//Exporting router
module.exports = router