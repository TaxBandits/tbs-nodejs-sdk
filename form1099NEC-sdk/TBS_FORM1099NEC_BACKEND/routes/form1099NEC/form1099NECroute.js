const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */
const { validateForm1099NEC } = require('../../controllers/form1099NEC/validateForm1099NECController') /*Importing validateform1099NEC from form1099NEC controllers */
const { createForm1099NEC } = require('../../controllers/form1099NEC/createForm1099NECController') /*Importing createform1099NEC from form1099NEC controllers */
const { listForm1099NEC } = require('../../controllers/form1099NEC/listForm1099NECController') /*Importing listform1099NEC from form1099NEC controllers */
const { getForm1099NEC } = require('../../controllers/form1099NEC/getForm1099NECController')   /*Importing getform1099NEC from form1099NEC controllers */
const { updateForm1099NEC } = require('../../controllers/form1099NEC/updateForm1099NECController')  /*Importing updateForm1099NEC from form1099NEC controllers */
const { statusForm1099NEC } = require('../../controllers/form1099NEC/statusForm1099NECController') /*Importing statusForm1099NEC from form1099NEC controllers */
const { deleteForm1099NEC } = require('../../controllers/form1099NEC/deleteForm1099NECController') /*Importing deleteForm1099NEC from form1099NEC controllers */
const { transmitForm1099NEC } = require('../../controllers/form1099NEC/transmitForm1099NECController') /*Importing transmitForm1099NEC from form1099NEC controllers */
const { requestPdfURLs } = require('../../controllers/form1099NEC/requestPdfURLsController') /*Importing requestPdfURLs from form1099NEC controllers */
const { requestDraftPdfUrl, decryptPdf } = require('../../controllers/form1099NEC/requestDraftPdfUrlController') /*Importing decryptPdf and requestDraftPdfUrl from form1099NEC controllers */

//Form 1099 NEC Routes
router.post('/ValidateForm', validateForm1099NEC) //validate Form Api Route
router.post('/Create', createForm1099NEC) //create Api Route
router.get('/List/:BusinessId', listForm1099NEC) //List Api Route
router.get('/Get', getForm1099NEC)  //Get Api Route
router.put('/Update', updateForm1099NEC)  //Update Api Route
router.get('/Status', statusForm1099NEC)  //Status Api Route
router.delete('/Delete', deleteForm1099NEC)  //Delete Api Route
router.post('/Transmit', transmitForm1099NEC)  //Transmit Api Route
router.post('/RequestDraftPdfUrl', requestDraftPdfUrl)  //requestDraftPdfUrl Api Route
router.post('/RequestPdfURLs', requestPdfURLs)  //requestPdfURLs Api Route
router.post('/decryptPdf', decryptPdf)  //decryptPdf Api Route

//Exporting router
module.exports = router