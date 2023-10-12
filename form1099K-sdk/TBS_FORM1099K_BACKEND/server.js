const express = require('express')
const dotenv = require('dotenv') /*Using dotenv to load environment variables*/
const cors = require ('cors')
dotenv.config();
const port = process.env.PORT; /*Initializing Port */
const app = express();
app.use(cors())

app.use(express.json()); /* Parse the incoming requests with JSON payloads */

app.use('/Business', require('./routes/business/businessRoute')) // Business/Create Routes
app.use('/Form1099K',require('./routes/form1099K/form1099Kroute'))  /*Form 1099-K Routes*/ 

// Listen to the connection on the specified port
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
});
