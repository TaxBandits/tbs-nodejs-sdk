const express = require('express') /*Using Express JS*/
const router = express.Router() /*Create new router object */

const { statusTinmatchingRecipients } = require('../../controllers/tinmatching/statusController') /*Importing TIN Matching Recipients Status from TIN Matching Recipients Status controller */
const { listTinmatchingRecipients } = require('../../controllers/tinmatching/listController') /*Importing TIN Matching Recipients List from TIN Matching Recipients List controller */
const { cancelTinMatchingRequest } = require('../../controllers/tinmatching/cancelController') /*Importing TIN Matching Recipients Cancel Request from TIN Matching Recipients Cancel Request controller */
const { requestTinMatching } = require('../../controllers/tinmatching/requestController') /*Importing TIN Matching Recipients Request from TIN Matching Recipients Request controller */

//TIN Matching Routes.
router.get('/Status', statusTinmatchingRecipients) //TIN Matching Recipients Status Route
router.get('/List', listTinmatchingRecipients) //TIN Matching Recipients List Route
router.put('/CancelRequest', cancelTinMatchingRequest) //TIN Matching Recipients Cancel Request Route
router.post('/Request', requestTinMatching) //TIN Matching Recipients Request Route

//Exporting router
module.exports = router