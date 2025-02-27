const express = require("express"); /*Using Express JS*/
const router = express.Router(); /*Create new router object */
const {
  createBusiness,
} = require("../../controllers/business/createBusinessController"); /*Importing CREATE Business from business controller */
const {
  getBusiness,
} = require("../../controllers/business/getBusinessController");
const {
  listBusiness,
} = require("../../controllers/business/listBusinessController");

const {
  attachDocument,
} = require("../../controllers/business/attachDocumentController");

const{
  transmitBusiness
} = require("../../controllers/business/transmitBusiness");

const{
  getStatusController
} = require("../../controllers/business/getStatusController");

// Create business Route
router.post("/Create", createBusiness);
router.get("/Get", getBusiness); //Get Business Route
router.get("/list", listBusiness); //Get Business Route
router.post("/AttachDocuments", attachDocument); //Get Business Route
router.post("/Transmit", transmitBusiness); //Transmit Route
router.post("/Status", getStatusController); //Transmit Route


//Exporting router
module.exports = router;
