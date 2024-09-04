const express = require('express') /*Using Express JS*/
const dotenv = require('dotenv') /*Using dotenv to load environment variables*/
const cors = require('cors')/*To avoid cors while connecting with frontend*/

dotenv.config() //To access the env file in node js backend

const port = process.env.PORT /*Initializing Port */
const app = express()

app.use(cors())

app.use(express.json()) /* Parse the incoming requests with JSON payloads */
app.use('/Business', require('./routes/business/createBusinessRoute')) // Business/Create Routes
app.use('/Business', require('./routes/business/listBusinessRoute')) //Business/List Routes
app.use('/TINMatchingRecipients',require('./routes/tinmatching/tinmatchingRoute')) //TINMatchingRecipients Routes

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})