const express = require('express')
const router = express.Router()


const {createForm1099MISC} = require('../../controller/form1099MISC/createForm1099MISCController') /*Importing createform1099MISC from form1099MISC controller */
const {deleteForm1099MISC} = require('../../controller/form1099MISC/deleteForm1099MISCController') /*Importing deleteForm1099MISC from form1099MISC controller */
const {validateForm1099MISC} = require('../../controller/form1099MISC/validateForm1099MISCController') /*Importing validateForm1099MISC from form1099MISC controller */
const {listForm1099MISC} = require('../../controller/form1099MISC/listForm1099MISCController') /*Importing listForm1099MISC from form1099MISC controller */
const {getform1099MISC} = require('../../controller/form1099MISC/getForm1099MISCController') /*Importing getForm1099MISC from form1099MISC controller */
const {updateForm1099MISC} = require('../../controller/form1099MISC/updateForm1099MISCController') /*Importing updateForm1099MISC from form1099MISC controller */
const {statusForm1099MISC} = require('../../controller/form1099MISC/statusform1099MISCController') /*Importing statusform1099MISC from form1099MISC controller */
const {transmitForm1099MISC} = require('../../controller/form1099MISC/transmitForm1099MISCController') /*Importing transmitForm1099MISC from form1099MISC controller */
const {requestDraftPdfUrl,decryptPdf} = require('../../controller/form1099MISC/requestDraftPdfUrlController') /*Importing requestDraftPdfUrl from form1099MISC controller */
const {requestPdfURLs} = require('../../controller/form1099MISC/requestPdfUrlController') /*Importing requestPdfUrl from form1099MISC controller */
 

router.post('/Create',createForm1099MISC) //create Api Route
router.delete('/Delete',deleteForm1099MISC)//Delete Api Route
router.post('/ValidateForm',validateForm1099MISC) //ValidateForm Api Route
router.get('/List/:BusinessId',listForm1099MISC) //List Api Route
router.get('/Get',getform1099MISC)  //Get Api Route
router.put('/Update',updateForm1099MISC) //update api routes
router.get('/Status',statusForm1099MISC) // status api routes
router.post('/Transmit',transmitForm1099MISC) // transmit api routes
router.post('/RequestDraftPdfUrl',requestDraftPdfUrl)  //requestDraftPdfUrl Api Route
router.post('/decryptPdf',decryptPdf)  //decryptPdf Api Route
router.post('/RequestPdfURLs',requestPdfURLs)  //requestPdfURLs Api Route

//Exporting router
module.exports = router;