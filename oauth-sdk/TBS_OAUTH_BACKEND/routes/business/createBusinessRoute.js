const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */
const {createBusiness} = require('../../controllers/business/createBusinessController') /*Importing createBusiness from business controller */


// Business Routes
// Create business
router.post('/create',createBusiness)

//Exporting router
module.exports = router;