const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */
const {listBusiness} = require('../../controllers/business/listBusinessController') /*Importing createBusiness from business controller */


// Business Routes
// To list business created by user
router.get('/list',listBusiness)

//Exporting router
module.exports = router;