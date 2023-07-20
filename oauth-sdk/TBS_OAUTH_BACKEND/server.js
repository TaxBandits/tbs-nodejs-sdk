const express = require('express') /*Using Express JS*/
const dotenv = require('dotenv'); /*Using dotenv to load environment variables*/
const cors = require('cors') // To avoid cors issue

dotenv.config(); //dotenv npm package to get and use env

const port = process.env.PORT; /*Initializing Port */
const app = express();

app.use(cors())

app.use(express.json()); /* Parse the incoming requests with JSON payloads */
app.use('/user', require('./routes/user/userRoute')); /*User Routes */
app.use('/business',require('./routes/business/listBusinessRoute')) /*Business Routes */
app.use('/business',require('./routes/business/createBusinessRoute')) /*Business Routes */


// Listen to the connection on the specified port
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
});