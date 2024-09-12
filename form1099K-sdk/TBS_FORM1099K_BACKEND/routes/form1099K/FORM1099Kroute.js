const express = require('express')
const router = express.Router()

const { createForm1099K } = require('../../controller/form1099K/createForm1099KController')/*Importing createform1099k from form1099k controller */
const { deleteForm1099K } = require('../../controller/form1099K/deleteForm1099KController')/*Importing deleteForm1099K from form1099k controller */
const { validateForm1099K } = require('../../controller/form1099K/validateForm1099KController')/*Importing validateForm1099K from form1099k controller */
const { listForm1099K } = require('../../controller/form1099K/listForm1099KController')/*Importing listform1099K from form1099k controller */
const { getform1099K } = require('../../controller/form1099K/getForm1099KController')/*Importing getform1099K from form1099k controller */
const { updateForm1099K } = require('../../controller/form1099K/updateForm1099KController')/*Importing updateform1099K from form1099k controller */
const { statusForm1099K } = require('../../controller/form1099K/statusForm1099KController')/*Importing statusform1099K from form1099k controller */
const { transmitForm1099K } = require('../../controller/form1099K/transmitform1099KController')/*Importing transmitform1099K from form1099k controller */
const { requestDraftPdfUrl, decryptPdf } = require('../../controller/form1099K/requestDraftPdfUrlController')/*Importing requestDraftPdfUrl from form1099k controller */
const { requestPdfURLs } = require('../../controller/form1099K/requestPdfUrlController')/*Importing requestPdfUrl from form1099k controller */

router.post('/Create', createForm1099K) //create Api Route
router.delete('/Delete', deleteForm1099K)//Delete Api Route
router.post('/ValidateForm', validateForm1099K)//validateForm Api route
router.get('/List/:BusinessId', listForm1099K) //List Api Route
router.get('/Get', getform1099K)  //Get Api Route
router.put('/Update', updateForm1099K)//updateForm Api route
router.get('/Status', statusForm1099K)//statusform api route
router.post('/Transmit', transmitForm1099K)//transmitForm api route
router.post('/RequestDraftPdfUrl', requestDraftPdfUrl)  //requestDraftPdfUrl Api Route
router.post('/decryptPdf', decryptPdf)  //decryptPdf Api Route
router.post('/RequestPdfURLs', requestPdfURLs)  //requestPdfURLs Api Route

//Exporting router
module.exports = router;